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
    registerUserEmail: builder.mutation({
      query: (body) => ({
        url: '/auth/email/register',
        body,
        method: 'POST',
      }),
    }),
    confirmUserEmail: builder.mutation({
      query: (body) => ({
        url: '/auth/email/confirm',
        body,
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetUserAdminQuery } = UsersAPI;
