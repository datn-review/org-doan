import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const AssignmentAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssignment: builder.query({
      query: (params) => ({
        url: '/assignment',
        params: params,
        method: 'GET',
      }),
    }),
    getAssignmentActive: builder.query({
      query: (params) => ({
        url: '/assignment/active',
        params: params,
        method: 'GET',
      }),
    }),
    createAssignment: builder.mutation({
      query: (body) => ({
        url: '/assignment',
        body,
        method: 'POST',
      }),
    }),

    submission: builder.mutation({
      query: ({ id, body }) => ({
        url: `/assignment/submission/${id}`,
        body,
        method: 'POST',
      }),
    }),
    findAssignment: builder.query({
      query: ({ id }) => ({
        url: `/assignment/${id}`,
        method: 'GET',
      }),
    }),

    reviewAssignment: builder.query({
      query: ({ id }) => ({
        url: `/assignment/review/${id}`,
        method: 'GET',
      }),
    }),

    updateAssignment: builder.mutation({
      query: ({ body, id }) => ({
        url: `/assignment/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignment/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAssignmentQuery,
  useLazyGetAssignmentQuery,
  useUpdateAssignmentMutation,
  useCreateAssignmentMutation,
  useDeleteAssignmentMutation,
  useLazyFindAssignmentQuery,
  useGetAssignmentActiveQuery,
  useSubmissionMutation,
  useLazyReviewAssignmentQuery,
} = AssignmentAPI;
