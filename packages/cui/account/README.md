# `@cui/account`

`@cui/account` contains framework-independent account and session domain logic. It coordinates an identity provider with persistent session storage without depending on NestJS, HTTP controllers, browser storage, or frontend state.

The current provider composition uses:

- Firebase Authentication to create anonymous identities, refresh credentials, verify active accounts, and delete the identity when a session closes.
- Supabase to store the application session row and its lifecycle timestamps.

NestJS controllers, cookies, environment loading, and HTTP status mapping belong to the consuming Auth Service.

## Public entry points

| Import | Purpose |
| --- | --- |
| `@cui/account` | Root session API re-export |
| `@cui/account/sessions` | Session service, contracts, configuration, and public models |
| `@cui/account/translations` | Account, Session, Users navigation, and Account page translations |

Consumers must not import files through internal `src/...` paths. Repository adapters and provider-specific implementation files are intentionally private.

## Package structure

```text
packages/cui/account/
├── sql/
│   └── sessions.sql
├── src/
│   ├── sessions/
│   │   ├── configurations/
│   │   │   └── firebase-supabase-provider.configuration.ts
│   │   ├── models/
│   │   │   ├── firebase.model.ts
│   │   │   ├── session.model.ts
│   │   │   └── supabase.model.ts
│   │   ├── repositories/
│   │   │   ├── firebase-auth-provider.repository.ts
│   │   │   └── supabase-session-provider.repository.ts
│   │   ├── services/
│   │   │   └── session.service.ts
│   │   └── index.ts
│   ├── translations/
│   │   ├── account.translations.ts
│   │   └── index.ts
│   └── index.ts
└── package.json
```

## Architecture

```text
AuthController
    ↓
Auth Service SessionService
    ↓
SessionService from @cui/account
    ├── SessionIdentityPort → Firebase Authentication
    └── SessionStoragePort  → Supabase sessions table
```

`SessionService` depends only on the two ports. The Firebase and Supabase configuration composes the current implementations. A different identity or storage provider can be supplied through `SessionServiceConfiguration` without changing the service.

## Session lifecycle

### Create

1. Firebase creates an anonymous identity and returns its identity ID and refresh credential.
2. Supabase inserts a `sessions` row containing the provider and provider ID.
3. The service returns an active, unverified session.

### Current

1. Firebase refreshes and verifies the credential.
2. Supabase finds the latest open row for the Firebase identity.
3. The session is considered verified only when the identity is valid and `verified_at` is present.

### Verify

1. Firebase verifies the credential and resolves its identity ID.
2. Supabase finds the associated open session.
3. Supabase updates `verified_at` with the current timestamp.

`verified_at` stores the latest verification time. Repeated verification replaces the previous timestamp; it does not create verification history.

### Close

1. Firebase deletes the anonymous identity.
2. Supabase sets `closed_at` on the matching open session row.

## Session service API

```ts
export interface SessionService {
  initialize(): SessionProviderConnections;
  create(): Promise<Session>;
  current(credential: string): Promise<Session>;
  verify(credential: string): Promise<SessionVerification>;
  close(
    sessionId: number,
    credential: string,
  ): Promise<ClosedStoredSession>;
}
```

- `initialize()` returns provider configuration status and public identifiers. It does not expose credentials.
- `create()` creates both the Firebase identity and Supabase session row.
- `current()` restores an open session from a credential.
- `verify()` verifies Firebase and updates the latest Supabase verification timestamp.
- `close()` closes both provider resources.

## Configuration

```ts
import {
  createFirebaseSupabaseProviderConfiguration,
  createSessionService,
} from "@cui/account/sessions";

const sessions = createSessionService(
  createFirebaseSupabaseProviderConfiguration({
    identity: {
      apiKey: process.env.FIREBASE_API_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
    },
    storage: {
      url: process.env.SUPABASE_URL,
      publishableKey: process.env.SUPABASE_PUBLISHABLE_KEY,
    },
  }),
);
```

Required environment values remain in the consuming application. The package does not load `.env` files and does not contain credentials.

## NestJS integration

The package itself does not depend on NestJS. The Auth Service registers the library service through a standard factory provider:

```ts
{
  provide: LIBRARY_SESSION_SERVICE,
  inject: [ConfigService],
  useFactory: (config: ConfigService) =>
    createSessionService(
      createFirebaseSupabaseProviderConfiguration({
        identity: {
          apiKey: config.get<string>("FIREBASE_API_KEY"),
          projectId: config.get<string>("FIREBASE_PROJECT_ID"),
        },
        storage: {
          url: config.get<string>("SUPABASE_URL"),
          publishableKey: config.get<string>("SUPABASE_PUBLISHABLE_KEY"),
        },
      }),
    ),
}
```

The Auth Service owns the HTTP-only cookie and maps package errors to HTTP exceptions. Provider credentials never need to be sent to the frontend.

## Supabase schema

Run [`sql/sessions.sql`](./sql/sessions.sql) in the Supabase SQL Editor. The script creates or updates the table, grants the required operations, configures row-level security policies, and reloads the PostgREST schema cache.

| Column | Purpose |
| --- | --- |
| `id` | Auto-incremented application session ID |
| `created_at` | Creation timestamp |
| `verified_at` | Latest verification timestamp |
| `closed_at` | Closure timestamp; `null` while active |
| `provider` | Identity provider name |
| `provider_id` | Provider identity ID |

## Translations

Account translations live in the package and are exposed independently from session repositories:

```ts
import {
  accountEnglishMessages,
  accountTranslations,
} from "@cui/account/translations";
```

The frontend translation registry connects them by spreading the English messages into its base dictionary and the selected language messages into each localized dictionary:

```ts
const englishMessages = {
  ...applicationEnglishMessages,
  ...accountEnglishMessages,
};

const messages = {
  en: englishMessages,
  es: { ...englishMessages, ...accountTranslations.es },
  pt: { ...englishMessages, ...accountTranslations.pt },
};
```

The package currently provides English, Spanish, and Brazilian Portuguese content. Technical error messages remain in English.

## Errors

Provider adapters use framework-independent repository errors from `@cui/network/providers/core`:

- `RepositoryNotFoundError`
- `RepositoryOperationError`
- `RepositoryValidationError`

`SessionProviderUnavailableError` indicates that a configured identity or storage provider could not be initialized. The package does not throw NestJS or HTTP-specific exceptions.

## Adding another provider

1. Implement `SessionIdentityPort` or `SessionStoragePort`.
2. Accept immutable configuration when creating the adapter.
3. Convert SDK-specific failures to repository errors.
4. Build a `SessionServiceConfiguration` using the implementation and a typed connection state.
5. Keep the adapter private unless a separate public provider entry point is intentionally introduced.

The session service requires no changes when a new adapter satisfies the relevant port.
