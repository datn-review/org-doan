import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const DistrictAPI = baseNoAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getDistrict: builder.query({
      query: (params) => ({
        url: '/districts',
        params: params,
        method: 'GET',
      }),
    }),
    getDistrictActive: builder.query({
      query: (params) => ({
        url: '/districts/active',
        params: params,
        method: 'GET',
      }),
    }),
    createDistrict: builder.mutation({
      query: (body) => ({
        url: '/districts',
        body,
        method: 'POST',
      }),
    }),
    findDistrict: builder.query({
      query: ({ id }) => ({
        url: `/districts/${id}`,
        method: 'GET',
      }),
    }),
    updateDistrict: builder.mutation({
      query: ({ body, id }) => ({
        url: `/districts/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteDistrict: builder.mutation({
      query: (id) => ({
        url: `/districts/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetDistrictQuery,
  useLazyGetDistrictQuery,
  useUpdateDistrictMutation,
  useCreateDistrictMutation,
  useDeleteDistrictMutation,
  useLazyFindDistrictQuery,
  useLazyGetDistrictActiveQuery,
} = DistrictAPI;
