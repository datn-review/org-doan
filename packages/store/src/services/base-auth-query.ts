import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseNoAuthQuery = fetchBaseQuery({
  baseUrl: "8000",
  // baseUrl: process.env.REACT_APP_API_AUTH_URL,
  cache: "no-cache",
});

export const baseAuthQuery = fetchBaseQuery({
  baseUrl: "8000",
  // process.env.REACT_APP_API_AUTH_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    const raw = localStorage.getItem("path");
    const hashed = localStorage.getItem("hashed");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("X-Hash-Key", `${raw}`);
      headers.set("X-Hash-Value", `${hashed}`);
    }
    return headers;
  },
  cache: "no-cache",
});

export const baseNoAuthSplitApi = createApi({
  reducerPath: "baseNoAuthSplitApi",
  baseQuery: baseNoAuthQuery,
  endpoints: () => ({}),
});

export const baseAuthSplitApi = createApi({
  reducerPath: "baseAuthSplitApi",
  baseQuery: baseAuthQuery,
  endpoints: () => ({}),
});
