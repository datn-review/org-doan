import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { activeMenu, auth } from "./slices";
import { AuthAPI } from "./services";
const rootReducer = combineReducers({
  activeMenu,
  auth,
  [AuthAPI.reducerPath]: AuthAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
