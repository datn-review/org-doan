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
    findUserAdmin: builder.query({
      query: ({ id }) => ({
        url: `/users/admin/${id}`,
        method: 'GET',
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
      query: (id) => ({
        url: `/users/admin/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUserAdminQuery,
  useLazyGetUserAdminQuery,
  useUpdateUserAdminMutation,
  useCreateUserAdminMutation,
  useDeleteUserAdminMutation,
  useLazyFindUserAdminQuery,
} = UsersAPI;
