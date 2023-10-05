import { baseNoAuthSplitApi } from "./base-auth-query";

export const AuthAPI = baseNoAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUserEmail: builder.mutation({
      query: (body) => ({
        url: "/auth/email/login",
        body,
        method: "POST",
      }),
    }),
    registerUserEmail: builder.mutation({
      query: (body) => ({
        url: "/auth/email/register",
        body,
        method: "POST",
      }),
    }),
  }),
});
export const { useLoginUserEmailMutation, useRegisterUserEmailMutation } =
  AuthAPI;
