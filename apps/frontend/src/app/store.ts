import { configureStore } from '@reduxjs/toolkit';
import { analysisApi } from '../services/api';
import { createRequestActivityMiddleware } from '../services/request-activity';

const requestActivityMiddleware = createRequestActivityMiddleware([
  analysisApi.reducerPath,
]);
export const store = configureStore({
  reducer: {
    [analysisApi.reducerPath]: analysisApi.reducer,
  },
  middleware: (g) =>
    g().concat(
      requestActivityMiddleware,
      analysisApi.middleware,
    ),
});
