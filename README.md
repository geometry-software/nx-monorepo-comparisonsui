# NX Monorepo Comparisons UI

An Nx workspace for recording observations and calculating their Pearson correlation.

## Applications

- `apps/_frontend` — React UI with data-entry forms, collection lists, comparisons, insights, Swagger, and architecture pages.
- `apps/years-service` — NestJS service for the `nm_years` MongoDB Atlas collection.
- `apps/tgi-service` — NestJS service for the `nm_tgi` MongoDB Atlas collection.
- `apps/comparison-service` — NestJS orchestrator that aligns data and stores Pearson results in `nm_comparisons`.

## Start

Configure the MongoDB Atlas connection values in `.env`, install dependencies, and run:

```bash
npm install
npm start
```

The application starts at [http://localhost:4201](http://localhost:4201).

For local development, copy `.env.example` to `.env` and run MongoDB on
`127.0.0.1:27017` before starting the app. Each service uses its own local database.

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
