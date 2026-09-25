import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DataContainer } from '@cui/network/providers';
import type { ComparisonDefinition, ComparisonModel, ComputeComparison } from '../lib/types';
import { getServiceApiUrl } from './service-location';

function unwrapApiResponse<Data>(response: DataContainer<Data>): Data {
  return response.data;
}

export const comparisonApi = createApi({
  reducerPath: 'comparisonApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['Comparisons'],
  endpoints: (build) => ({
    getComparisonDefinition: build.query<ComparisonDefinition, void>({
      query: () => getServiceApiUrl('comparisons', 'definition'),
      transformResponse: unwrapApiResponse<ComparisonDefinition>,
    }),
    getComparisonModel: build.query<ComparisonModel, void>({
      query: () => getServiceApiUrl('comparisons', 'model'),
      transformResponse: unwrapApiResponse<ComparisonModel>,
    }),
    listComputeComparisons: build.query<ComputeComparison[], void>({
      query: () => getServiceApiUrl('comparisons', 'computes'),
      transformResponse: unwrapApiResponse<ComputeComparison[]>,
      providesTags: ['Comparisons'],
    }),
    createComputeComparison: build.mutation<ComputeComparison, { computeId: string; accountSessionId: number; provider: 'mongodb' | 'bump'; sources: { sourceId: string; name: string }[] }>({
      query: (body) => ({
        url: getServiceApiUrl('comparisons', 'computes'),
        method: 'POST',
        body,
      }),
      transformResponse: unwrapApiResponse<ComputeComparison>,
      invalidatesTags: ['Comparisons'],
    }),
  }),
});

export const {
  useGetComparisonDefinitionQuery,
  useGetComparisonModelQuery,
  useListComputeComparisonsQuery,
  useCreateComputeComparisonMutation,
} = comparisonApi;
