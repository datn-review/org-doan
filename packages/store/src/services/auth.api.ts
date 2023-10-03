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
  }),
});
export const { useLoginUserEmailMutation } = AuthAPI;
