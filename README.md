# NX Monorepo Comparisons UI

An Nx workspace for recording observations and calculating their Pearson correlation.

## Applications

React UI with data-entry forms, collection lists, comparisons, insights, Swagger, and architecture pages. NestJS services provide authentication, dataset access, and correlation processing.

## Start

```bash
npm start
```

The application starts at [http://localhost:4201](http://localhost:4201).

Bootstrap stops with an error if `.env` is missing. It does not inspect, create,
or overwrite the file. For local MongoDB, set the connection URIs in `.env` to
your local databases and ensure MongoDB is running before starting the app.

## Local services

| Service     | API                                          | Swagger                      |
| ----------- | -------------------------------------------- | ---------------------------- |
| Auth        | `http://localhost:3015/api/auth/sessions`    | `http://localhost:3015/docs` |
| Year        | `http://localhost:3010/api/observations`     | `http://localhost:3010/docs` |
| TGI         | `http://localhost:3012/api/observations`     | `http://localhost:3012/docs` |
| Comparisons | `http://localhost:3017/api/comparisons`      | `http://localhost:3017/docs` |

Auth Service reads Firebase and Supabase configuration from the workspace
`.env`. The frontend calls its controller and receives an HttpOnly session
cookie; provider credentials are not included in the frontend bundle.
