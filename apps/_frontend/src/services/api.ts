import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiResponseContainer } from '@nx-react-nestjs/backend';
import type {
  BulkDeleteResponse,
  Comparison,
  ComparisonDefinition,
  Page,
  SeriesKey,
  SeriesObservation,
} from '../lib/types';
import { getServiceApiUrl } from './service-location';

function unwrapApiResponse<Data>(response: ApiResponseContainer<Data>): Data {
  return response.data;
}

export const analysisApi = createApi({
  reducerPath: 'analysisApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['Series', 'Comparisons'],
  endpoints: (build) => ({
    getComparisonDefinition: build.query<ComparisonDefinition, void>({
      query: () => getServiceApiUrl('comparisons', 'definition'),
      transformResponse: unwrapApiResponse<ComparisonDefinition>,
    }),
    listSeries: build.query<Page<SeriesObservation>, SeriesKey>({
      query: (key) =>
        `${getServiceApiUrl(key)}?page=1&limit=100&sort=year&order=asc`,
      providesTags: (_result, _error, key) => [{ type: 'Series', id: key }],
    }),
    createObservation: build.mutation<
      SeriesObservation,
      { key: SeriesKey; year: number; value?: number }
    >({
      query: ({ key, ...body }) => ({
        url: getServiceApiUrl(key),
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, { key }) => [
        { type: 'Series', id: key },
        'Comparisons',
      ],
    }),
    deleteAllObservations: build.mutation<BulkDeleteResponse, SeriesKey>({
      query: (key) => ({
        url: getServiceApiUrl(key),
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, key) => [
        { type: 'Series', id: key },
        'Comparisons',
      ],
    }),
    listComparisons: build.query<Comparison[], void>({
      query: () => getServiceApiUrl('comparisons'),
      transformResponse: unwrapApiResponse<Comparison[]>,
      providesTags: ['Comparisons'],
    }),
    refreshComparisons: build.mutation<Comparison[], void>({
      query: () => ({
        url: getServiceApiUrl('comparisons', 'refresh'),
        method: 'POST',
      }),
      transformResponse: unwrapApiResponse<Comparison[]>,
      invalidatesTags: ['Comparisons'],
    }),
    deleteAllComparisons: build.mutation<BulkDeleteResponse, void>({
      query: () => ({
        url: getServiceApiUrl('comparisons'),
        method: 'DELETE',
      }),
      transformResponse: unwrapApiResponse<BulkDeleteResponse>,
      invalidatesTags: ['Comparisons'],
    }),
  }),
});

export const {
  useListSeriesQuery,
  useCreateObservationMutation,
  useDeleteAllObservationsMutation,
  useGetComparisonDefinitionQuery,
  useListComparisonsQuery,
  useRefreshComparisonsMutation,
  useDeleteAllComparisonsMutation,
} = analysisApi;
