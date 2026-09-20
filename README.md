# NX Monorepo Comparisons UI

An Nx workspace for recording observations and calculating their Pearson correlation.

## Applications

- `apps/_frontend` — React UI with data-entry forms, collection lists, comparisons, insights, Swagger, and architecture pages.
- `apps/years-service` — NestJS service for the `nm_years` MongoDB Atlas collection.
- `apps/tgi-service` — NestJS service for the `nm_tgi` MongoDB Atlas collection.
- `apps/comparison-service` — NestJS orchestrator that aligns data and stores Pearson results in `nm_comparisons`.

## Start

Create and fill in `.env` in the workspace root with `YEARS_MONGODB_URI`,
`TGI_MONGODB_URI`, and `COMPARISONS_MONGODB_URI`, then run:

```bash
npm start
```

The application starts at [http://localhost:4201](http://localhost:4201).

Bootstrap stops with an error if `.env` is missing or empty. It never creates or
overwrites the file. If the local Nx executable is missing, it runs `npm ci`
to install dependencies from `package-lock.json` before starting the services.
For local MongoDB, set the connection URIs in `.env` to your local databases
and ensure MongoDB is running before starting the app.

## Local services

| Service | API | Swagger |
| --- | --- | --- |
| Year | `http://localhost:3010/api/observations` | `http://localhost:3010/docs` |
| TGI | `http://localhost:3012/api/observations` | `http://localhost:3012/docs` |
| Comparisons | `http://localhost:3017/api/comparisons` | `http://localhost:3017/docs` |

## Sample data

With all services running, populate the Year and TGI collections and refresh the comparison:

```bash
npm run seed
```

Pearson correlation describes association in the current dataset; it does not establish causation.
