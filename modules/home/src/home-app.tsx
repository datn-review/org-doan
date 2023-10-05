import { Authorization } from "@org/auth";
import { useTranslation } from "@org/i18n";
import { setActiveGroup, useAppDispatch, useAppSelector } from "@org/store";
import { Space } from "@org/ui";
import { RolesEnum, TypeRolesEnum } from "@org/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      Home App
      <Space>
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
      </Space>
    </div>
  );
}

export default HomeApp;
