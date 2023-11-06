import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const GradeLevelAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getGradeLevel: builder.query({
      query: (params) => ({
        url: '/grade-level',
        params: params,
        method: 'GET',
      }),
    }),
    getGradeLevelActive: builder.query({
      query: (params) => ({
        url: '/grade-level/active',
        params: params,
        method: 'GET',
      }),
    }),
    createGradeLevel: builder.mutation({
      query: (body) => ({
        url: '/grade-level',
        body,
        method: 'POST',
      }),
    }),
    findGradeLevel: builder.query({
      query: ({ id }) => ({
        url: `/grade-level/${id}`,
        method: 'GET',
      }),
    }),
    updateGradeLevel: builder.mutation({
      query: ({ body, id }) => ({
        url: `/grade-level/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteGradeLevel: builder.mutation({
      query: (id) => ({
        url: `/grade-level/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetGradeLevelQuery,
  useLazyGetGradeLevelQuery,
  useUpdateGradeLevelMutation,
  useCreateGradeLevelMutation,
  useDeleteGradeLevelMutation,
  useLazyFindGradeLevelQuery,
  useGetGradeLevelActiveQuery,
} = GradeLevelAPI;
