import { configureStore } from '@reduxjs/toolkit';
import { comparisonApi } from '../services/comparisons.service';
import { createRequestActivityMiddleware } from '../services/request-activity';

const requestActivityMiddleware = createRequestActivityMiddleware([
  comparisonApi.reducerPath,
]);
export const store = configureStore({
  reducer: {
    [comparisonApi.reducerPath]: comparisonApi.reducer,
  },
  middleware: (g) =>
    g().concat(
      requestActivityMiddleware,
      comparisonApi.middleware,
    ),
});
