import { ReactNode } from 'react';

export interface MenuItem {
  name: string | ReactNode;
  path: string;
  icon: ReactNode;
  id: string;
  subMenu: any[];
  isHide?: boolean;
}

export interface IMenuIcon {
  title: ReactNode;
  path: string;
  icon: React.ReactNode;
  key: string;
  isShow?: boolean;
}
