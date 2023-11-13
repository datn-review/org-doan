import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const UserAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileMe: builder.query({
      query: (params) => ({
        url: '/auth/me',
        params: params,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProfileMeQuery } = UserAPI;
