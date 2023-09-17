import { Button } from "../../atoms";
import { ReactComponent as I18nIcon } from "../../../assets/icons/svg/i18n.svg";
import { ReactComponent as NotiCationIcon } from "../../../assets/icons/svg/notication.svg";

import * as S from "./styled";
import { Badge } from "antd";
type MenuItem = {
  name: string;
  path: string;
  icon: string;
  id: string;
  subMenu: any[];
};
export const Header = () => {
  const menu: MenuItem[] = [
    {
      name: "Home",
      path: "/",
      id: "home",
      icon: "",
      subMenu: [],
    },
    {
      name: "DashBoard",
      path: "/dashboard",
      id: "dashboard",
      icon: "",
      subMenu: [],
    },
  ];

  return <></>;
};
