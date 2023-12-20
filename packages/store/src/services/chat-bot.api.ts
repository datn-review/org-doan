import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';

export const ChatBotAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatBot: builder.query({
      query: (params) => ({
        url: '/chat-bot',
        params: params,
        method: 'GET',
      }),
    }),
    getChatBotActive: builder.query({
      query: (params) => ({
        url: '/chat-bot/active',
        params: params,
        method: 'GET',
      }),
    }),
    createChatBot: builder.mutation({
      query: (body) => ({
        url: '/chat-bot',
        body,
        method: 'POST',
      }),
    }),
    findChatBot: builder.query({
      query: ({ id }) => ({
        url: `/chat-bot/${id}`,
        method: 'GET',
      }),
    }),
    updateChatBot: builder.mutation({
      query: ({ body, id }) => ({
        url: `/chat-bot/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteChatBot: builder.mutation({
      query: (id) => ({
        url: `/chat-bot/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetChatBotQuery,
  useLazyGetChatBotQuery,
  useUpdateChatBotMutation,
  useCreateChatBotMutation,
  useDeleteChatBotMutation,
  useLazyFindChatBotQuery,
  useGetChatBotActiveQuery,
} = ChatBotAPI;
