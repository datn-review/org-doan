import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { activeMenu, auth, user } from './slices';
import {
  AuthAPI,
  UserAPI,
  GradeLevelAPI,
  CertificationAPI,
  SubjectAPI,
  SkillsAPI,
  DistrictAPI,
  WardAPI,
  ProvinceAPI,
  PostsAPI,
  UserTutorAPI,
  UserStudentAPI,
  UsersAdminAPI,
  RegistrationAPI,
  CollaborationAPI,
  PaymentAPI,
} from './services';
import { baseAuthSplitApi, baseNoAuthSplitApi } from './services/base-auth-query';

const rootReducer = combineReducers({
  activeMenu,
  auth,
  user,
  [baseNoAuthSplitApi.reducerPath]: baseNoAuthSplitApi.reducer,
  [baseAuthSplitApi.reducerPath]: baseAuthSplitApi.reducer,

  [AuthAPI.reducerPath]: AuthAPI.reducer,
  [UserAPI.reducerPath]: UserAPI.reducer,
  [GradeLevelAPI.reducerPath]: GradeLevelAPI.reducer,
  [CertificationAPI.reducerPath]: CertificationAPI.reducer,
  [SubjectAPI.reducerPath]: SubjectAPI.reducer,
  [SkillsAPI.reducerPath]: SkillsAPI.reducer,
  [ProvinceAPI.reducerPath]: ProvinceAPI.reducer,
  [DistrictAPI.reducerPath]: DistrictAPI.reducer,
  [WardAPI.reducerPath]: WardAPI.reducer,
  [PostsAPI.reducerPath]: PostsAPI.reducer,
  [UserTutorAPI.reducerPath]: UserTutorAPI.reducer,
  [UserStudentAPI.reducerPath]: UserStudentAPI.reducer,
  [UsersAdminAPI.reducerPath]: UsersAdminAPI.reducer,
  [RegistrationAPI.reducerPath]: RegistrationAPI.reducer,
  [CollaborationAPI.reducerPath]: CollaborationAPI.reducer,
  [PaymentAPI.reducerPath]: PaymentAPI.reducer,
});

export const store: any = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(baseNoAuthSplitApi.middleware)
      .concat(baseAuthSplitApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
