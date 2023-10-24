import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const CertificationAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getCertification: builder.query({
      query: (params) => ({
        url: '/certifications',
        params: params,
        method: 'GET',
      }),
    }),
    createCertification: builder.mutation({
      query: (body) => ({
        url: '/certifications',
        body,
        method: 'POST',
      }),
    }),
    findCertification: builder.query({
      query: ({ id }) => ({
        url: `/certifications/${id}`,
        method: 'GET',
      }),
    }),
    updateCertification: builder.mutation({
      query: ({ body, id }) => ({
        url: `/certifications/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteCertification: builder.mutation({
      query: (id) => ({
        url: `/certifications/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCertificationQuery,
  useLazyGetCertificationQuery,
  useUpdateCertificationMutation,
  useCreateCertificationMutation,
  useDeleteCertificationMutation,
  useLazyFindCertificationQuery,
} = CertificationAPI;
