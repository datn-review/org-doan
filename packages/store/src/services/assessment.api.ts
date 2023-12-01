import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const AssessmentAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssessment: builder.query({
      query: (params) => ({
        url: '/assessment',
        params: params,
        method: 'GET',
      }),
    }),
    getAssessmentActive: builder.query({
      query: (params) => ({
        url: '/assessment/active',
        params: params,
        method: 'GET',
      }),
    }),
    createAssessment: builder.mutation({
      query: (body) => ({
        url: '/assessment',
        body,
        method: 'POST',
      }),
    }),
    findAssessment: builder.query({
      query: ({ id }) => ({
        url: `/assessment/${id}`,
        method: 'GET',
      }),
    }),
    updateAssessment: builder.mutation({
      query: ({ body, id }) => ({
        url: `/assessment/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteAssessment: builder.mutation({
      query: (id) => ({
        url: `/assessment/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAssessmentQuery,
  useLazyGetAssessmentQuery,
  useUpdateAssessmentMutation,
  useCreateAssessmentMutation,
  useDeleteAssessmentMutation,
  useLazyFindAssessmentQuery,
  useGetAssessmentActiveQuery,
} = AssessmentAPI;
