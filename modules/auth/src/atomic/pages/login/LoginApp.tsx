import { css } from "@emotion/css";
import { useTranslation } from "@org/i18n";
import {
  setActiveGroup,
  useAppDispatch,
  useLoginUserEmailMutation,
} from "@org/store";
import {
  BoxCenter,
  Button,
  CheckBoxForm,
  FormProvider,
  InputForm,
  Space,
  TextLink,
  useForm,
  yupResolver,
} from "@org/ui";
import { SiteMap } from "@org/utils";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";

interface ILogin {
  email: string;
  password: string;
  remember?: boolean;
}

const schema = yup.object({
  email: yup.string().required("Email required."),
  password: yup.string().required("Password required"),
  remember: yup.boolean(),
});

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
      email: "",
      remember: false,
    },
    resolver: yupResolver(schema),
  });

  const [loginUserEmail] = useLoginUserEmailMutation();

  const onSubmit = (data: ILogin) => {
    loginUserEmail({ email: data.email, password: data.password })
      .unwrap()
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div>
      <Space
        className={css`
          padding-top: 1rem;
          padding-bottom: 3rem;
        `}
      >
        <h5
          className={css`
            padding-bottom: 0.8rem;
          `}
        >
          Welcome to Smart! 👋🏻
        </h5>
        <p>Please sign-in to your account and start the adventure</p>
      </Space>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputForm name="email" label={"Email"} />
          <InputForm name="password" label={"Password"} />

          <Space
            className={css`
              display: flex;
              justify-content: space-between;
              margin-bottom: 2rem;
            `}
          >
            <Space>
              <CheckBoxForm labelCB="Remember" name="remember" />
            </Space>
            <Link to={SiteMap.Auth.ForgotPassword.path}>
              <TextLink>Forgot password? </TextLink>
            </Link>
          </Space>
          <Button
            type="submit"
            className={css`
              width: 100% !important;
              margin-bottom: 2rem;
            `}
          >
            {t("auth.title.login")}
          </Button>
        </form>
        <BoxCenter>
          New on our platform?{" "}
          <Link to="/register">
            <Link to={SiteMap.Auth.Register.path}>
              <TextLink
                className={css`
                  margin-left: 1rem;
                `}
              >
                {" "}
                Create an account{" "}
              </TextLink>
            </Link>
          </Link>
        </BoxCenter>
        <BoxCenter
          className={css`
            margin: 2rem;
          `}
        >
          or
        </BoxCenter>

        <BoxCenter
          className={css`
            gap: 0.5rem;
          `}
        >
          <Space>FB</Space>
          <Space>GG</Space>
          <Space>TT</Space>
        </BoxCenter>
      </FormProvider>
    </div>
  );
}

export default Login;
