import { createSlice } from "@reduxjs/toolkit";
import { RolesEnum } from "@org/utils";

export interface ILoginUserEmail {
  token: string;
  user: IUserData;
}

export interface IUserData {
  id: number;
  email: string;
  provider: string;
  socialId: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  photo: string;
  role: Role;
  status: Status;
  __entity?: string;
}

export interface Role {
  id: number;
  name: RolesEnum;
  __entity?: string;
}

export interface Status {
  id: number;
  name: string;
}
const initialState: IUserData = {
  id: -1,
  email: "",
  provider: "",
  socialId: "",
  firstName: "",
  lastName: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
  photo: "",
  role: {
    id: 1,
    name: RolesEnum.ANONYMOUS,
  },
  status: {
    id: 0,
    name: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      return {
        ...state,
        ...action,
      };
    },
    removeUserInfo: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

const { actions, reducer: user } = userSlice;
export const { setUserInfo, removeUserInfo } = actions;

export { user };
