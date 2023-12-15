import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const UserParentAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getParent: builder.query({
      query: (params) => ({
        url: '/users/parent',
        params: params,
        method: 'GET',
      }),
    }),
    createParent: builder.mutation({
      query: (body) => ({
        url: '/users/parent',
        body,
        method: 'POST',
      }),
    }),
    findParent: builder.query({
      query: ({ id }) => ({
        url: `/users/parent/${id}`,
        method: 'GET',
      }),
    }),
    updateParent: builder.mutation({
      query: ({ body, id }) => ({
        url: `/users/parent/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteParent: builder.mutation({
      query: (id) => ({
        url: `/users/parent/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetParentQuery,
  useLazyGetParentQuery,
  useUpdateParentMutation,
  useCreateParentMutation,
  useDeleteParentMutation,
  useLazyFindParentQuery,
} = UserParentAPI;
