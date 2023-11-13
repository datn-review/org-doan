import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const WardAPI = baseNoAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getWard: builder.query({
      query: (params) => ({
        url: '/wards',
        params: params,
        method: 'GET',
      }),
    }),
    getWardActive: builder.query({
      query: (params) => ({
        url: '/wards/active',
        params: params,
        method: 'GET',
      }),
    }),
    createWard: builder.mutation({
      query: (body) => ({
        url: '/wards',
        body,
        method: 'POST',
      }),
    }),
    findWard: builder.query({
      query: ({ id }) => ({
        url: `/wards/${id}`,
        method: 'GET',
      }),
    }),
    updateWard: builder.mutation({
      query: ({ body, id }) => ({
        url: `/wards/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteWard: builder.mutation({
      query: (id) => ({
        url: `/wards/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetWardQuery,
  useLazyGetWardQuery,
  useUpdateWardMutation,
  useCreateWardMutation,
  useDeleteWardMutation,
  useLazyFindWardQuery,
  useLazyGetWardActiveQuery,
} = WardAPI;
