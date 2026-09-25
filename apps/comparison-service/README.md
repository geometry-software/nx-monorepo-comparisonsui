# Comparison service

The comparison service calculates correlations for every source pair in a selected compute. It stores each completed result in the MongoDB `compute_comparisons` collection, so the comparison table survives service restarts. Persistence is provided by the Mongo repository from `@cui/network/providers`; the service does not create a MongoDB client directly.

The service uses the shared `DATA_SOURCES_MONGODB_URI` setting. Its comparisons live in a separate collection within that database.

The active comparison model is `period-value`: each source observation contains a string `period` and a numeric `value`. The data-source service includes this model in compute metadata, and the comparison service checks it before aligning periods and calculating Pearson correlation. The model is also exposed by `GET /api/comparisons/definition`.
