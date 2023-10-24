import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const SkillsAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query({
      query: (params) => ({
        url: '/skills',
        params: params,
        method: 'GET',
      }),
    }),
    createSkills: builder.mutation({
      query: (body) => ({
        url: '/skills',
        body,
        method: 'POST',
      }),
    }),
    findSkills: builder.query({
      query: ({ id }) => ({
        url: `/skills/${id}`,
        method: 'GET',
      }),
    }),
    updateSkills: builder.mutation({
      query: ({ body, id }) => ({
        url: `/skills/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteSkills: builder.mutation({
      query: (id) => ({
        url: `/skills/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useLazyGetSkillsQuery,
  useUpdateSkillsMutation,
  useCreateSkillsMutation,
  useDeleteSkillsMutation,
  useLazyFindSkillsQuery,
} = SkillsAPI;
