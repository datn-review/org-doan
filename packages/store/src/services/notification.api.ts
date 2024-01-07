import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const NotificationsAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (params) => ({
        url: '/notifications',
        params: params,
        method: 'GET',
      }),
    }),
    getNotificationsActive: builder.query({
      query: (params) => ({
        url: '/notifications/active',
        params: params,
        method: 'GET',
      }),
    }),
    createNotifications: builder.mutation({
      query: (body) => ({
        url: '/notifications',
        body,
        method: 'POST',
      }),
    }),
    findNotifications: builder.query({
      query: ({ id }) => ({
        url: `/notifications/${id}`,
        method: 'GET',
      }),
    }),
    updateNotifications: builder.mutation({
      query: ({ body, id }) => ({
        url: `/notifications/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteNotifications: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useUpdateNotificationsMutation,
  useCreateNotificationsMutation,
  useDeleteNotificationsMutation,
  useLazyFindNotificationsQuery,
  useGetNotificationsActiveQuery,
} = NotificationsAPI;
