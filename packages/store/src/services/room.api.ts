import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const RoomAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoom: builder.query({
      query: (params) => ({
        url: '/room',
        params: params,
        method: 'GET',
      }),
    }),
    getRoomActive: builder.query({
      query: (params) => ({
        url: '/room/active',
        params: params,
        method: 'GET',
      }),
    }),
    createRoom: builder.mutation({
      query: (body) => ({
        url: '/room',
        body,
        method: 'POST',
      }),
    }),
    findRoom: builder.query({
      query: ({ id }) => ({
        url: `/room/${id}`,
        method: 'GET',
      }),
    }),
    updateRoom: builder.mutation({
      query: ({ body, id }) => ({
        url: `/room/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/room/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetRoomQuery,
  useLazyGetRoomQuery,
  useUpdateRoomMutation,
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useLazyFindRoomQuery,
  useGetRoomActiveQuery,
} = RoomAPI;
