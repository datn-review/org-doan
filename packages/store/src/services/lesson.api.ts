import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const LessonAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getLesson: builder.query({
      query: (params) => ({
        url: '/lessons',
        params: params,
        method: 'GET',
      }),
    }),
    createLessonDefault: builder.mutation({
      query: (body) => ({
        url: '/lessons/default',
        body,
        method: 'POST',
      }),
    }),
    createLesson: builder.mutation({
      query: (body) => ({
        url: '/lessons',
        body,
        method: 'POST',
      }),
    }),
    findLesson: builder.query({
      query: ({ id }) => ({
        url: `/lessons/${id}`,
        method: 'GET',
      }),
    }),
    updateLesson: builder.mutation({
      query: ({ body, id }) => ({
        url: `/lessons/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetLessonQuery,
  useLazyGetLessonQuery,
  useUpdateLessonMutation,
  useCreateLessonMutation,
  useDeleteLessonMutation,
  useLazyFindLessonQuery,
  useCreateLessonDefaultMutation,
} = LessonAPI;
