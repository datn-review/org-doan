import { baseAuthSplitApi, baseNoAuthSplitApi } from './base-auth-query';
import { socketService } from './chat.service';

export const ChatAPI = baseAuthSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getChat: builder.query({
      query: (params) => ({
        url: '/chat',
        params: params,
        method: 'GET',
      }),
    }),
    getChatActive: builder.query({
      query: (params) => ({
        url: '/chat/active',
        params: params,
        method: 'GET',
      }),
    }),
    createChat: builder.mutation({
      query: (body) => ({
        url: '/chat',
        body,
        method: 'POST',
      }),
    }),
    findChat: builder.query({
      query: ({ id }) => ({
        url: `/chat/${id}`,
        method: 'GET',
      }),
    }),
    updateChat: builder.mutation({
      query: ({ body, id }) => ({
        url: `/chat/${id}`,
        body,
        method: 'PUT',
      }),
    }),
    deleteChat: builder.mutation({
      query: (id) => ({
        url: `/chat/${id}`,
        method: 'DELETE',
      }),
    }),
    getMessages: builder.query<any[], number>({
      query: (roomId) => ({ url: '/message/list', params: { roomId } }),
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;
          console.log('OKKKKk');
          socketService.joinRoom(arg);
          socketService.subscribeToMessages((data: any) => {
            updateCachedData((draft) => {
              draft.push(data);
            });
          });
        } catch (error) {
          console.log(error);
        }
        await cacheEntryRemoved;
      },
    }),
    addMessage: builder.mutation<null, any>({
      queryFn: (data) => {
        socketService.sendMessage(data);
        return { data: null };
      },
    }),
    notifyTyping: builder.mutation<null, number>({
      queryFn: (roomId) => {
        socketService.notifyTyping(roomId);
        return { data: null };
      },
    }),
  }),
});

export const {
  useGetChatQuery,
  useLazyGetChatQuery,
  useUpdateChatMutation,
  useCreateChatMutation,
  useDeleteChatMutation,
  useLazyFindChatQuery,
  useGetChatActiveQuery,
  useAddMessageMutation,
  useNotifyTypingMutation,
  useGetMessagesQuery,
  useLazyGetMessagesQuery,
} = ChatAPI;
