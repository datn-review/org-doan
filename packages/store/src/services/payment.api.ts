import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const PaymentAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayment: builder.query({
      query: (params) => ({
        url: '/payment',
        params: params,
        method: 'GET',
      }),
    }),
    getReturnPayment: builder.query({
      query: (params) => ({
        url: '/payment/return',
        params: params,
        method: 'GET',
      }),
    }),

    createPayment: builder.mutation({
      query: (body) => ({
        url: '/payment/VNPAY',
        body,
        method: 'POST',
      }),
    }),
    findPayment: builder.query({
      query: ({ id }) => ({
        url: `/Payment/${id}`,
        method: 'GET',
      }),
    }),
    updatePayment: builder.mutation({
      query: ({ body, id }) => ({
        url: `/Payment/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/Payment/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPaymentQuery,
  useLazyGetPaymentQuery,
  useUpdatePaymentMutation,
  useCreatePaymentMutation,
  useDeletePaymentMutation,
  useLazyFindPaymentQuery,
  useLazyGetReturnPaymentQuery,
} = PaymentAPI;
