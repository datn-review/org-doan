import React, { useEffect } from "react";
import { Button } from "@org/ui";
import { useTranslation } from "@org/i18n";
import { useAppDispatch, setActiveGroup } from "@org/store";
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
      <Button>Home</Button>
    </div>
  );
}

export default HomeApp;
