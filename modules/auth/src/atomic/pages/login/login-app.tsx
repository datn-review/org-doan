import React, { useEffect } from "react";
import { Button } from "@org/ui";
import { useTranslation } from "@org/i18n";
import { useAppDispatch, setActiveGroup } from "@org/store";
import { Link } from "react-router-dom";
function Login() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveGroup({ current: "login" }));
    return () => {
      dispatch(setActiveGroup({ current: "" }));
    };
  }, []);
  return (
    <div>
      {/* <h1>{t("auth.title.login")}</h1> */}
      <h5>Welcome to Smart! 👋🏻</h5>
      <p>Please sign-in to your account and start the adventure</p>
      <input type="text" />
      <input type="text" />

      {/* <Link to="/">
        <Button>Home</Button>
      </Link> */}

      <Button>{t("auth.title.login")}</Button>
    </div>
  );
}

export default Login;
