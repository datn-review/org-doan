import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
const URL_API =
  import.meta.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_APP_API_AUTH_URL_PRO
    : import.meta.env.VITE_APP_API_AUTH_URL_DEV;
console.log(URL_API);
export const baseNoAuthQuery = fetchBaseQuery({
  baseUrl: URL_API,
  cache: 'no-cache',
});
export const baseAuthQuery = fetchBaseQuery({
  baseUrl: URL_API,
  // process.env.REACT_APP_API_AUTH_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    const raw = localStorage.getItem('path');
    const hashed = localStorage.getItem('hashed');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('X-Hash-Key', `${raw}`);
      headers.set('X-Hash-Value', `${hashed}`);
    }
    return headers;
  },
  cache: 'no-cache',
});
export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseAuthQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('authorities');

    window.location.href = '/login';
  }
  if (
    result.error &&
    result.error.status === 403 &&
    // @ts-ignore
    result.error?.data?.errorCode == 'ACCESS_DENIED'
  ) {
    window.location.href = '/403';
  }

  return result;
};

export const baseNoAuthSplitApi = createApi({
  reducerPath: 'baseNoAuthSplitApi',
  baseQuery: baseNoAuthQuery,
  endpoints: () => ({}),
});

export const baseAuthSplitApi = createApi({
  reducerPath: 'baseAuthSplitApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
