import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const SubjectAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubject: builder.query({
      query: (params) => ({
        url: '/subject',
        params: params,
        method: 'GET',
      }),
    }),
    createSubject: builder.mutation({
      query: (body) => ({
        url: '/subject',
        body,
        method: 'POST',
      }),
    }),
    findSubject: builder.query({
      query: ({ id }) => ({
        url: `/subject/${id}`,
        method: 'GET',
      }),
    }),
    updateSubject: builder.mutation({
      query: ({ body, id }) => ({
        url: `/subject/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `/subject/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetSubjectQuery,
  useLazyGetSubjectQuery,
  useUpdateSubjectMutation,
  useCreateSubjectMutation,
  useDeleteSubjectMutation,
  useLazyFindSubjectQuery,
} = SubjectAPI;
