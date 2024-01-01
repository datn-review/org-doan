import { createSlice } from '@reduxjs/toolkit';
import { RolesEnum } from '@org/utils';
interface IAuthorizedData {
  isAuthenticated: boolean;
  role: RolesEnum;
  userId: number | null;
  authorities: RolesEnum[];
}
const initialState: IAuthorizedData = {
  isAuthenticated: !!localStorage.getItem('accessToken'),
  role:
    localStorage.getItem('role') != null
      ? (('' + localStorage.getItem('role')) as RolesEnum)
      : RolesEnum.ANONYMOUS,
  userId: Number(localStorage.getItem('userId')) || -1,
  authorities:
    localStorage.getItem('authorities') != null
      ? (('' + localStorage.getItem('authorities')).split(';') as RolesEnum[])
      : [RolesEnum.ANONYMOUS],
};

const storeUserInfoLocalStorage = (payload: any) => {
  localStorage.setItem('accessToken', payload.access_token);
  payload.refresh_token && localStorage.setItem('refreshToken', payload.refresh_token);

  localStorage.setItem('userId', payload.userId);
  localStorage.setItem('role', payload.role);
  localStorage.setItem('authorities', payload.authorities);

  payload.username && localStorage.setItem('username', payload.username);
};
const removeUserInfoLocalStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  localStorage.removeItem('userId');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
  localStorage.removeItem('authorities');
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginUser: (
      state,
      action: {
        payload: {
          access_token: string;
          refresh_token?: string;
          userId: number;
          role: RolesEnum;
          username?: string;
          authorities: RolesEnum[];
        };
      },
    ) => {
      storeUserInfoLocalStorage(action.payload);

      return {
        ...state,
        userId: action.payload.userId,
        role: action.payload.role,
        authorities: action.payload?.authorities,
        isAuthenticated: !!action.payload.access_token,
      };
    },
    logout: (state) => {
      removeUserInfoLocalStorage();
      localStorage.setItem('role', RolesEnum.ANONYMOUS);
      localStorage.setItem('authorities', RolesEnum.ANONYMOUS);
      return {
        ...state,
        userId: null,
        isAuthenticated: false,
        authorities: [RolesEnum.ANONYMOUS],
        role: RolesEnum.ANONYMOUS,
      };
    },
  },
});

const { actions, reducer: auth } = authSlice;
export const { setLoginUser, logout } = actions;

export { auth };
