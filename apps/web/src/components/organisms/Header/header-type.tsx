import { ReactNode } from 'react';

export type MenuItem = {
  name: string;
  path: string;
  icon: ReactNode;
  id: string;
  subMenu: any[];
};

export type IMenuIcon = {
  title: string;
  path: string;
  icon: React.ReactNode;
  key: string;
};
