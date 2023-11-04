import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const UserStudentAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStudent: builder.query({
      query: (params) => ({
        url: '/users/student',
        params: params,
        method: 'GET',
      }),
    }),
    createUserStudent: builder.mutation({
      query: (body) => ({
        url: '/users/student',
        body,
        method: 'POST',
      }),
    }),
    findUserStudent: builder.query({
      query: ({ id }) => ({
        url: `/users/student/${id}`,
        method: 'GET',
      }),
    }),
    updateUserStudent: builder.mutation({
      query: ({ body, id }) => ({
        url: `/users/student/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteUserStudent: builder.mutation({
      query: (id) => ({
        url: `/users/student/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUserStudentQuery,
  useLazyGetUserStudentQuery,
  useUpdateUserStudentMutation,
  useCreateUserStudentMutation,
  useDeleteUserStudentMutation,
  useLazyFindUserStudentQuery,
} = UserStudentAPI;
