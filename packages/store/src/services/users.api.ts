import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';
import { socketService } from './chat.service';

export const UserAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileMe: builder.query({
      query: (params) => ({
        url: '/auth/me',
        params: params,
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        const data = (await queryFulfilled).data;
        const token = localStorage.getItem('accessToken') || '';
        console.log(arg);
        socketService.connectWithAuthToken(token);
      },
    }),
    getProfileForID: builder.query({
      query: ({ id }) => ({
        url: `/auth/${id}`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        const data = (await queryFulfilled).data;
        const token = localStorage.getItem('accessToken') || '';
        console.log(arg);
        socketService.connectWithAuthToken(token);
      },
    }),
    getUsersActive: builder.query({
      query: (params) => ({
        url: '/users/active',
        params: params,
        method: 'GET',
      }),
    }),
    getUsers: builder.query({
      query: (params) => ({
        url: '/users',
        params: params,
        method: 'GET',
      }),
    }),

    updateMe: builder.mutation({
      query: (body) => ({
        url: `/auth/me`,
        body,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useGetProfileMeQuery,
  useGetUsersActiveQuery,
  useGetProfileForIDQuery,
  useUpdateMeMutation,
  useGetUsersQuery,
} = UserAPI;
