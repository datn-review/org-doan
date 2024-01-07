import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const CollaborationAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getCollaboration: builder.query({
      query: (params) => ({
        url: '/collaboration',
        params: params,
        method: 'GET',
      }),
    }),
    getCollaborationActive: builder.query({
      query: (params) => ({
        url: '/collaboration/active',
        params: params,
        method: 'GET',
      }),
    }),
    createCollaboration: builder.mutation({
      query: (body) => ({
        url: '/collaboration',
        body,
        method: 'POST',
      }),
    }),
    posterConfirmCollaboration: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/collaboration/poster-confirm/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    registerConfirmCollaboration: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/collaboration/register-confirm/${id}`,
        body,
        method: 'PUT',
      }),
    }),

    findCollaboration: builder.query({
      query: (id) => ({
        url: `/collaboration/${id}`,
        method: 'GET',
      }),
    }),
    getMeCollaboration: builder.query({
      query: () => ({
        url: `/collaboration/request`,
        method: 'GET',
      }),
    }),
    getCollaborationByPost: builder.query({
      query: (id) => ({
        url: `/collaboration/post/${id}`,
        method: 'GET',
      }),
    }),

    getClasses: builder.query({
      query: (id) => ({
        url: `/collaboration/classes`,
        method: 'GET',
      }),
    }),
    getClassesAll: builder.query({
      query: (id) => ({
        url: `/collaboration/classes/all`,
        method: 'GET',
      }),
    }),

    updateCollaboration: builder.mutation({
      query: ({ body, id }) => ({
        url: `/collaboration/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    cancelCollaboration: builder.mutation({
      query: ({ id }) => ({
        url: `/collaboration/cancel/${id}`,
        method: 'PUT',
      }),
    }),
    deleteCollaboration: builder.mutation({
      query: (id) => ({
        url: `/collaboration/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCollaborationQuery,
  useLazyGetCollaborationQuery,
  useUpdateCollaborationMutation,
  useCancelCollaborationMutation,

  useCreateCollaborationMutation,
  useDeleteCollaborationMutation,
  useLazyFindCollaborationQuery,
  useGetCollaborationActiveQuery,
  useGetMeCollaborationQuery,
  useLazyGetMeCollaborationQuery,
  useLazyGetCollaborationByPostQuery,
  useRegisterConfirmCollaborationMutation,
  usePosterConfirmCollaborationMutation,
  useLazyGetClassesQuery,
  useLazyGetClassesAllQuery,
  useGetClassesAllQuery,
} = CollaborationAPI;
