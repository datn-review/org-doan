export type MenuItem = {
  name: string;
  path: string;
  icon: string;
  id: string;
  subMenu: any[];
};

export type IMenuIcon = {
  title: string;
  path: string;
  icon: React.ReactNode;
  key: string;
};
