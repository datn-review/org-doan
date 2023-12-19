import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadingBot: false,
};

const botChatSlice = createSlice({
  name: 'botChat',
  initialState,
  reducers: {
    setLoadingBot: (state, action: { payload: boolean }) => {
      state.loadingBot = action.payload;
    },
  },
});

const { actions, reducer: botChat } = botChatSlice;
export const { setLoadingBot } = actions;
export { botChat };
