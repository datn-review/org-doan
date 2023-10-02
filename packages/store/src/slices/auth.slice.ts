import { createSlice } from "@reduxjs/toolkit";
import { RolesEnum } from "@org/utils";
interface IAuthorizedData {
  isAuthenticated: boolean;
  role: RolesEnum;
  userId: string | null;
  authorities: RolesEnum[];
}
const initialState: IAuthorizedData = {
  isAuthenticated: !!localStorage.getItem("accessToken"),
  role:
    localStorage.getItem("role") != null
      ? (("" + localStorage.getItem("role")) as RolesEnum)
      : RolesEnum.ANONYMOUS,
  userId: localStorage.getItem("userId"),
  authorities:
    localStorage.getItem("authorities") != null
      ? (("" + localStorage.getItem("authorities")).split(";") as RolesEnum[])
      : [RolesEnum.ANONYMOUS],
};

const storeUserInfo = (payload: any) => {
  localStorage.setItem("accessToken", payload.access_token);
  payload.refresh_token &&
    localStorage.setItem("refreshToken", payload.refresh_token);

  localStorage.setItem("userId", payload.userId);
  localStorage.setItem("role", payload.role);
  localStorage.setItem("authorities", payload.authorities);

  payload.username && localStorage.setItem("username", payload.username);
};
const removeUserInfo = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  localStorage.removeItem("userId");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  localStorage.removeItem("authorities");
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginUser: (
      state,
      action: {
        payload: {
          access_token: string;
          refresh_token?: string;
          userId: string;
          role: RolesEnum;
          username?: string;
          authorities: RolesEnum[];
        };
      }
    ) => {
      storeUserInfo(action.payload);

      return {
        ...state,
        userId: action.payload.userId,
        role: action.payload.role,
        authorities: action.payload?.authorities,
      };
    },
    logout: (state) => {
      removeUserInfo();
      return {
        ...state,
        usetId: null,
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
