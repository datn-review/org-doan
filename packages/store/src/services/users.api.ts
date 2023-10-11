import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const UsersAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserAdmin: builder.query({
      query: (params) => ({
        url: '/users/admin',
        params: params,
        method: 'GET',
      }),
    }),
    createUserAdmin: builder.mutation({
      query: (body) => ({
        url: '/users/admin',
        body,
        method: 'POST',
      }),
    }),
    updateUserAdmin: builder.mutation({
      query: ({ body, id }) => ({
        url: `/users/admin/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteUserAdmin: builder.mutation({
      query: ({ body, id }) => ({
        url: `/users/admin/${id}`,
        body,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUserAdminQuery,
  useUpdateUserAdminMutation,
  useCreateUserAdminMutation,
  useDeleteUserAdminMutation,
} = UsersAPI;
