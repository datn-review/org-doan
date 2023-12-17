import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const PostsAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (params) => ({
        url: '/posts',
        params: params,
        method: 'GET',
      }),
    }),
    getPostsActive: builder.query({
      query: (params) => ({
        url: '/posts/active',
        params: params,
        method: 'GET',
      }),
    }),
    getPostsActiveAuth: builder.query({
      query: (params) => ({
        url: '/posts/active/auth',
        params: params,
        method: 'GET',
      }),
    }),
    getPostsByMe: builder.query({
      query: () => ({
        url: '/posts/my',
        method: 'GET',
      }),
    }),
    createPosts: builder.mutation({
      query: (body) => ({
        url: '/posts',
        body,
        method: 'POST',
      }),
    }),
    findPosts: builder.query({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
    }),
    updatePosts: builder.mutation({
      query: ({ body, id }) => ({
        url: `/posts/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deletePosts: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useUpdatePostsMutation,
  useCreatePostsMutation,
  useDeletePostsMutation,
  useLazyFindPostsQuery,
  useGetPostsActiveQuery,
  useLazyGetPostsActiveQuery,
  useLazyGetPostsActiveAuthQuery,

  useGetPostsByMeQuery,
} = PostsAPI;
