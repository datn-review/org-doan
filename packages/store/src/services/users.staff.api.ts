import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const UserStaffAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaff: builder.query({
      query: (params) => ({
        url: '/users/staff',
        params: params,
        method: 'GET',
      }),
    }),
    createStaff: builder.mutation({
      query: (body) => ({
        url: '/users/staff',
        body,
        method: 'POST',
      }),
    }),
    findStaff: builder.query({
      query: ({ id }) => ({
        url: `/users/staff/${id}`,
        method: 'GET',
      }),
    }),
    updateStaff: builder.mutation({
      query: ({ body, id }) => ({
        url: `/users/staff/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteStaff: builder.mutation({
      query: (id) => ({
        url: `/users/staff/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetStaffQuery,
  useLazyGetStaffQuery,
  useUpdateStaffMutation,
  useCreateStaffMutation,
  useDeleteStaffMutation,
  useLazyFindStaffQuery,
} = UserStaffAPI;
