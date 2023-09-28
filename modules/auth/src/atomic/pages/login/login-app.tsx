import React, { useEffect } from "react";
import { Button, InputForm } from "@org/ui";
import { useTranslation } from "@org/i18n";
import { useAppDispatch, setActiveGroup } from "@org/store";
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "@org/ui/src/form";
function Login() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveGroup({ current: "login" }));
    return () => {
      dispatch(setActiveGroup({ current: "" }));
    };
  }, []);
  const methods = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <div>
      {/* <h1>{t("auth.title.login")}</h1> */}
      <h5>Welcome to Smart! 👋🏻</h5>
      <p>Please sign-in to your account and start the adventure</p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputForm name="name" />

          <input type="submit" />
        </form>
      </FormProvider>
      {/* InputFrom */}
      {/* <Link to="/">
        <Button>Home</Button>
      </Link> */}
      <Button>{t("auth.title.login")}</Button>
    </div>
  );
}

export default Login;
