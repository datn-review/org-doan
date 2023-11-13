import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const ProvinceAPI = baseNoAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getProvince: builder.query({
      query: (params) => ({
        url: '/province',
        params: params,
        method: 'GET',
      }),
    }),
    getProvinceActive: builder.query({
      query: (params) => ({
        url: '/province/active',
        params: params,
        method: 'GET',
      }),
    }),
    createProvince: builder.mutation({
      query: (body) => ({
        url: '/province',
        body,
        method: 'POST',
      }),
    }),
    findProvince: builder.query({
      query: ({ id }) => ({
        url: `/province/${id}`,
        method: 'GET',
      }),
    }),
    updateProvince: builder.mutation({
      query: ({ body, id }) => ({
        url: `/province/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteProvince: builder.mutation({
      query: (id) => ({
        url: `/province/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProvinceQuery,
  useLazyGetProvinceQuery,
  useUpdateProvinceMutation,
  useCreateProvinceMutation,
  useDeleteProvinceMutation,
  useLazyFindProvinceQuery,
  useGetProvinceActiveQuery,
  useLazyGetProvinceActiveQuery,
} = ProvinceAPI;
