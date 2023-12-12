import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const FeedbackAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedback: builder.query({
      query: (params) => ({
        url: '/feedback',
        params: params,
        method: 'GET',
      }),
    }),
    getFeedbackActive: builder.query({
      query: (params) => ({
        url: '/feedback/active',
        params: params,
        method: 'GET',
      }),
    }),
    createFeedback: builder.mutation({
      query: (body) => ({
        url: '/feedback',
        body,
        method: 'POST',
      }),
    }),
    findFeedback: builder.query({
      query: ({ id }) => ({
        url: `/feedback/${id}`,
        method: 'GET',
      }),
    }),
    updateFeedback: builder.mutation({
      query: ({ body, id }) => ({
        url: `/feedback/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `/feedback/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetFeedbackQuery,
  useLazyGetFeedbackQuery,
  useUpdateFeedbackMutation,
  useCreateFeedbackMutation,
  useDeleteFeedbackMutation,
  useLazyFindFeedbackQuery,
  useGetFeedbackActiveQuery,
} = FeedbackAPI;
