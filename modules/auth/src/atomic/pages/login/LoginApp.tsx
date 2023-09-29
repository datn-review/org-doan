import React, { useEffect } from "react";
import { useTranslation } from "@org/i18n";
import { useAppDispatch, setActiveGroup } from "@org/store";
import { FormProvider, useForm, Button, InputForm, yupResolver } from "@org/ui";
import * as yup from "yup";

interface ILogin {
  userName: string;
  password: string;
}

const schema = yup
  .object({
    userName: yup.string().required("userName required"),
    password: yup.string().required("password required"),
  })
  .required();

function Login() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveGroup({ current: "login" }));
    return () => {
      dispatch(setActiveGroup({ current: "" }));
    };
  }, []);

  const methods = useForm<ILogin>({
    defaultValues: {
      userName: "hehe",
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    console.log(methods.getValues("userName"));
  }, [methods.getValues("userName")]);
  console.log("🚀 ~ file: LoginApp.tsx:35 ~ Login ~ methods:", methods);

  useEffect(() => {
    const callAPi = setTimeout(() => {
      methods.setValue("userName", "testDefault");
    }, 1000);
    return () => clearTimeout(callAPi);
  }, []);
  const onSubmit = (data: any) => console.log(data);
  return (
    <div>
      {/* <h1>{t("auth.title.login")}</h1> */}
      <h5>Welcome to Smart! 👋🏻</h5>
      <p>Please sign-in to your account and start the adventure</p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputForm name="userName" />
          <InputForm name="password" />

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
