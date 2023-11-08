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
    findCollaboration: builder.query({
      query: ({ id }) => ({
        url: `/collaboration/${id}`,
        method: 'GET',
      }),
    }),
    getMeCollaboration: builder.query({
      query: () => ({
        url: `/collaboration/resigter`,
        method: 'GET',
      }),
    }),
    getCollaborationByPost: builder.query({
      query: (id) => ({
        url: `/collaboration/post/${id}`,
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
  useCreateCollaborationMutation,
  useDeleteCollaborationMutation,
  useLazyFindCollaborationQuery,
  useGetCollaborationActiveQuery,
  useGetMeCollaborationQuery,
  useLazyGetCollaborationByPostQuery,
} = CollaborationAPI;
