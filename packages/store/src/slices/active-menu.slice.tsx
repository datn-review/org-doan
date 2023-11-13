import { createSlice } from '@reduxjs/toolkit';

export enum MenuHeaderEnum {
  dashboard = 'dashboard',
  home = 'home',
  assignment = 'assignment',
  gradedAssignment = 'graded-assignment',
  lessonPlanner = 'lesson-planner',
  report = 'reports',
  setting = 'setting',
  message = 'message',
  users = 'users',
  account = 'account',
  import = 'import',
  empty = '',
}

export enum CurrentViewEnum {
  ANONYMOUS = 'anonymous',
  AUTHORIZED = 'authorized',
  SCHOOL_BY_PASS = 'school_by_pass',
}

const initialState = {
  menu: '',
  subMenu: '',
  backUrl: '',
  currentView: '',
};

const activeMenuSlice = createSlice({
  name: 'activeMenu',
  initialState,
  reducers: {
    setActiveMenu: (
      state,
      action: { payload: { menu: MenuHeaderEnum | string; subMenu: string } },
    ) => {
      state.menu = action.payload.menu;
      state.menu = action.payload.subMenu;
    },
    setActiveGroup: (state, action: { payload: { current: MenuHeaderEnum | string } }) => {
      state.menu = action.payload.current;
    },

    setActiveSubGroup: (
      state,
      action: {
        payload: {
          current: string;
        };
      },
    ) => {
      state.subMenu = action.payload.current;
    },
    updateBackUrl: (state, action: { payload: { backUrl: string } }) => {
      state.backUrl = action.payload.backUrl;
    },
    updateCurrentView: (state, action: { payload: { currentView: CurrentViewEnum } }) => {
      state.currentView = action.payload.currentView;
    },
    clearActiveMenu: (state) => {
      state.menu = '';
      state.subMenu = '';
      state.backUrl = '';
    },
  },
});

const { actions, reducer: activeMenu } = activeMenuSlice;
export const {
  setActiveGroup,
  setActiveSubGroup,
  updateBackUrl,
  updateCurrentView,
  clearActiveMenu,
} = actions;

export { activeMenu };
