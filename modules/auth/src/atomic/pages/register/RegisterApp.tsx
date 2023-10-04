import { css } from "@emotion/css";
import { useTranslation } from "@org/i18n";
import { useAppDispatch, useRegisterUserEmailMutation } from "@org/store";
import {
  BoxCenter,
  Button,
  CheckBoxForm,
  FormProvider,
  InputForm,
  Space,
  Spin,
  TextLink,
  message,
  useForm,
  yupResolver,
} from "@org/ui";
import { SiteMap } from "@org/utils";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

interface IRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  policy?: boolean;
}

const schema = yup.object({
  firstName: yup.string().required("firstName required."),
  lastName: yup.string().required("lastName required."),
  email: yup.string().required("Email required."),
  password: yup.string().required("Password required"),
  policy: yup.boolean(),
});

function RegisterApp() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const methods = useForm<IRegister>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const [registerUserEmail, { isLoading }] = useRegisterUserEmailMutation();

  const onSubmit = (data: IRegister) => {
    if (data.policy) {
      const { lastName, firstName, email, password } = data;
      registerUserEmail({
        firstName,
        lastName,
        email,
        password,
      })
        .unwrap()
        .then(() => {
          messageApi.open({
            type: "success",
            content: "Vui lòng xác nhận địa chi email của bạn ở hộp thư!",
            duration: 5,
          });
          setTimeout(() => {
            navigate(SiteMap.Auth.Login.path);
          }, 5000);
        })
        .catch((err) => {
          console.log("🚀 ~ file: LoginApp.tsx:89 ~ .then ~ err:", err);
        });
    }
  };
  return (
    <Spin spinning={isLoading}>
      {contextHolder}
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
            Adventure starts here 🚀
          </h5>
          <p>Make your app management easy and fun!</p>
        </Space>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputForm name="firstName" label={"First Name"} />
            <InputForm name="lastName" label={"Last Name"} />

            <InputForm name="email" label={"Email"} />
            <InputForm name="password" label={"Password"} />

            <Space
              className={css`
                display: flex;
                justify-content: flex-start;
                gap: 0.5rem;
                margin-bottom: 2rem;
              `}
            >
              <Space>
                <CheckBoxForm
                  labelCB={
                    <Link to={SiteMap.Auth.ForgotPassword.path}>
                      I agree to <TextLink> privacy policy & terms </TextLink>
                    </Link>
                  }
                  name="policy"
                />
              </Space>
            </Space>
            <Button
              type="submit"
              className={css`
                width: 100% !important;
                margin-bottom: 2rem;
              `}
            >
              {t("auth.title.register")}
            </Button>
          </form>
          <BoxCenter>
            Already have an account?
            <Link to={SiteMap.Auth.Login.path}>
              <TextLink
                className={css`
                  margin-left: 1rem;
                `}
              >
                Sign in instead
              </TextLink>
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
    </Spin>
  );
}

export default RegisterApp;
