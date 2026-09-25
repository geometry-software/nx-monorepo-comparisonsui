# NX Monorepo Comparisons UI

An Nx workspace for recording observations and calculating their Pearson correlation.

## Applications

React UI with data-entry forms, collection lists, comparisons and insights pages. NestJS services provide session, dataset access, and correlation processing.

## Start

```bash
npm start
```

The application starts at [http://localhost:4201](http://localhost:4201).

The root `.env` file contains credentials. Add the credentials required by the providers you use.

## Local services

| Service      | API                                              | Swagger                      |
| ------------ | ------------------------------------------------ | ---------------------------- |
| Auth         | `http://localhost:3015/api/auth/sessions`        | `http://localhost:3015/docs` |
| Data Sources | `http://localhost:3018/api/data-sources`         | `http://localhost:3018/docs` |
| Comparisons  | `http://localhost:3017/api/comparisons/computes` | `http://localhost:3017/docs` |

