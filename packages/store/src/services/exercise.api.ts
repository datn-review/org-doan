import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const ExerciseAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getExercise: builder.query({
      query: (params) => ({
        url: '/exercise',
        params: params,
        method: 'GET',
      }),
    }),
    getExerciseActive: builder.query({
      query: (params) => ({
        url: '/exercise/active',
        params: params,
        method: 'GET',
      }),
    }),
    createExercise: builder.mutation({
      query: (body) => ({
        url: '/exercise',
        body,
        method: 'POST',
      }),
    }),
    createExerciseCustoms: builder.mutation({
      query: (body) => ({
        url: '/exercise/customs',
        body,
        method: 'POST',
      }),
    }),
    createExerciseCrawl: builder.mutation({
      query: (body) => ({
        url: '/exercise/crawl',
        body,
        method: 'POST',
      }),
    }),
    findExercise: builder.query({
      query: ({ id }) => ({
        url: `/exercise/${id}`,
        method: 'GET',
      }),
    }),
    updateExercise: builder.mutation({
      query: ({ body, id }) => ({
        url: `/exercise/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteExercise: builder.mutation({
      query: (id) => ({
        url: `/exercise/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetExerciseQuery,
  useLazyGetExerciseQuery,
  useUpdateExerciseMutation,
  useCreateExerciseMutation,
  useDeleteExerciseMutation,
  useLazyFindExerciseQuery,
  useGetExerciseActiveQuery,
  useCreateExerciseCustomsMutation,
  useCreateExerciseCrawlMutation,
} = ExerciseAPI;
