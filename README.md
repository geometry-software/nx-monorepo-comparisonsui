# NX Monorepo Comparisons UI

An Nx workspace for recording observations and calculating their Pearson correlation.

## Applications

React UI with data-entry forms, collection lists, comparisons, insights, Swagger, and architecture pages. NestJS dataset services and processing for MongoDB Atlas collections.

## Start

```bash
npm start
```

The application starts at [http://localhost:4201](http://localhost:4201).

Bootstrap stops with an error if `.env` is missing or empty. It never creates or
overwrites the file. For local MongoDB, set the connection URIs in `.env` to your local databases and ensure MongoDB is running before starting the app.

## Local services

| Service | API | Swagger |
| --- | --- | --- |
| Year | `http://localhost:3010/api/observations` | `http://localhost:3010/docs` |
| TGI | `http://localhost:3012/api/observations` | `http://localhost:3012/docs` |
| Comparisons | `http://localhost:3017/api/comparisons` | `http://localhost:3017/docs` |
