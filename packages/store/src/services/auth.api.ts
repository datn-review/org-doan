import { baseNoAuthSplitApi } from './base-auth-query';
import { socketService } from './chat.service';

export const AuthAPI = baseNoAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUserEmail: builder.mutation({
      query: (body) => ({
        url: '/auth/email/login',
        body,
        method: 'POST',
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        const token = (await queryFulfilled).data.token;
        socketService.connectWithAuthToken(token);
      },
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

export const {
  useLoginUserEmailMutation,
  useRegisterUserEmailMutation,
  useConfirmUserEmailMutation,
} = AuthAPI;
