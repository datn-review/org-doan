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
    getUsersActive: builder.query({
      query: (params) => ({
        url: '/users/active',
        params: params,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProfileMeQuery, useGetUsersActiveQuery } = UserAPI;
