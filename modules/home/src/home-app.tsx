import React from "react";
import { Button } from "@org/ui";
import { useTranslation } from "@org/i18n";

function HomeApp() {
  const { t } = useTranslation();
  return (
    <div>
      HomeApp Nè
      {t("title")}
      <Button>Home</Button>
    </div>
  );
}

export default HomeApp;
