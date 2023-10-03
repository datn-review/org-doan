import React, { useEffect } from "react";
import { Button } from "@org/ui";
import { useTranslation } from "@org/i18n";
import { useAppDispatch, setActiveGroup, logout } from "@org/store";
import { Authorization } from "@org/auth";
import { RolesEnum, TypeRolesEnum } from "@org/utils";
import { Link } from "react-router-dom";
function HomeApp() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveGroup({ current: "home" }));
    return () => {
      dispatch(setActiveGroup({ current: "" }));
    };
  }, []);
  return (
    <div>
      HomeApp Nè
      {t("title")}
      <Authorization
        type={TypeRolesEnum.IF_ANY_GRANTED}
        roles={[RolesEnum.WEB_ADMIN]}
      >
        ADMIN
      </Authorization>
      <Button
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </Button>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    </div>
  );
}

export default HomeApp;
