import React, { useEffect } from "react";
import { Button } from "@org/ui";
import { useTranslation } from "@org/i18n";
import {
  useAppDispatch,
  setActiveGroup,
  logout,
  removeUserInfo,
  useAppSelector,
} from "@org/store";
import { Authorization } from "@org/auth";
import { RolesEnum, SiteMap, TypeRolesEnum } from "@org/utils";
import { Link, useNavigate } from "react-router-dom";
import { Show } from "./../../../packages/ui/src/atomic/atoms/show/index";
function HomeApp() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveGroup({ current: "home" }));
    return () => {
      dispatch(setActiveGroup({ current: "" }));
    };
  }, []);
  return (
    <div>
      HomeApp
      {t("title")}
      <Authorization
        type={TypeRolesEnum.IF_ANY_GRANTED}
        roles={[RolesEnum.WEB_ADMIN]}
      >
        WEB_ADMIN
      </Authorization>
      <Authorization
        type={TypeRolesEnum.IF_ANY_GRANTED}
        roles={[RolesEnum.WEB_STAFF]}
      >
        WEB_STAFF
      </Authorization>
      <Show
        when={isAuthenticated}
        fallback={
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        }
      >
        <Button
          onClick={() => {
            dispatch(logout());
            dispatch(removeUserInfo());
            navigate(SiteMap.Auth.Login.path);
          }}
        >
          Logout
        </Button>
      </Show>
    </div>
  );
}

export default HomeApp;
