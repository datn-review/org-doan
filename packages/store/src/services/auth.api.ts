import { baseNoAuthSplitApi } from "./base-auth-query";

export const AuthAPI = baseNoAuthSplitApi.injectEndpoints({
  endpoints: () => ({}),
});
