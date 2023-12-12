import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const UserTutorAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserTutor: builder.query({
      query: (params) => ({
        url: '/users/tutor',
        params: params,
        method: 'GET',
      }),
    }),
    getUserTutorActive: builder.query({
      query: (params) => ({
        url: '/users/tutor/active',
        params: params,
        method: 'GET',
      }),
    }),
    createUserTutor: builder.mutation({
      query: (body) => ({
        url: '/users/tutor',
        body,
        method: 'POST',
      }),
    }),
    findUserTutor: builder.query({
      query: ({ id }) => ({
        url: `/users/tutor/${id}`,
        method: 'GET',
      }),
    }),
    updateUserTutor: builder.mutation({
      query: ({ body, id }) => ({
        url: `/users/tutor/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteUserTutor: builder.mutation({
      query: (id) => ({
        url: `/users/tutor/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUserTutorQuery,
  useLazyGetUserTutorQuery,
  useUpdateUserTutorMutation,
  useCreateUserTutorMutation,
  useDeleteUserTutorMutation,
  useLazyFindUserTutorQuery,
  useGetUserTutorActiveQuery,
} = UserTutorAPI;
