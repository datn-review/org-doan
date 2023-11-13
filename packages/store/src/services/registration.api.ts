import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const RegistrationAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getRegistration: builder.query({
      query: (params) => ({
        url: '/registration',
        params: params,
        method: 'GET',
      }),
    }),
    getRegistrationActive: builder.query({
      query: (params) => ({
        url: '/registration/active',
        params: params,
        method: 'GET',
      }),
    }),
    createRegistration: builder.mutation({
      query: (body) => ({
        url: '/registration',
        body,
        method: 'POST',
      }),
    }),
    findRegistration: builder.query({
      query: ({ id }) => ({
        url: `/registration/${id}`,
        method: 'GET',
      }),
    }),
    getMeRegistration: builder.query({
      query: () => ({
        url: `/registration/resigter`,
        method: 'GET',
      }),
    }),
    getRegistrationByPost: builder.query({
      query: (id) => ({
        url: `/registration/post/${id}`,
        method: 'GET',
      }),
    }),
    updateRegistration: builder.mutation({
      query: ({ body, id }) => ({
        url: `/registration/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteRegistration: builder.mutation({
      query: (id) => ({
        url: `/registration/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetRegistrationQuery,
  useLazyGetRegistrationQuery,
  useUpdateRegistrationMutation,
  useCreateRegistrationMutation,
  useDeleteRegistrationMutation,
  useLazyFindRegistrationQuery,
  useGetRegistrationActiveQuery,
  useGetMeRegistrationQuery,
  useLazyGetRegistrationByPostQuery,
} = RegistrationAPI;
