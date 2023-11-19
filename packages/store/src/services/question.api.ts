import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const QuestionAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestion: builder.query({
      query: (params) => ({
        url: '/question',
        params: params,
        method: 'GET',
      }),
    }),
    getQuestionActive: builder.query({
      query: (params) => ({
        url: '/question/active',
        params: params,
        method: 'GET',
      }),
    }),
    createQuestion: builder.mutation({
      query: (body) => ({
        url: '/question',
        body,
        method: 'POST',
      }),
    }),
    findQuestion: builder.query({
      query: ({ id }) => ({
        url: `/question/${id}`,
        method: 'GET',
      }),
    }),
    updateQuestion: builder.mutation({
      query: ({ body, id }) => ({
        url: `/question/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/question/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetQuestionQuery,
  useLazyGetQuestionQuery,
  useUpdateQuestionMutation,
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useLazyFindQuestionQuery,
  useGetQuestionActiveQuery,
} = QuestionAPI;
