import { css } from '@emotion/css';
import { useTranslation } from '@org/i18n';
import {
  ILoginUserEmail,
  setActiveGroup,
  setLoginUser,
  setUserInfo,
  useAppDispatch,
  useLoginUserEmailMutation,
} from '@org/store';
import {
  BoxCenter,
  Button,
  CheckBoxForm,
  FormProvider,
  InputForm,
  Space,
  Spin,
  TextLink,
  TypeInput,
  useForm,
  yupResolver,
} from '@org/ui';
import { RolesEnum, SiteMap } from '@org/utils';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth2ICons from '../../atoms';
import * as yup from 'yup';

interface ILogin {
  email: string;
  password: string;
  remember?: boolean;
}

const schema = yup.object({
  email: yup.string().required('Email required.'),
  password: yup.string().required('Password required'),
  remember: yup.boolean(),
});

function Login() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setActiveGroup({ current: 'login' }));
    return () => {
      dispatch(setActiveGroup({ current: '' }));
    };
  }, []);

  const methods = useForm<ILogin>({
    defaultValues: {
      email: 'tamtest@gmail.com',
      password: '123456',
      remember: false,
    },
    resolver: yupResolver(schema),
  });

  const [loginUserEmail, { isLoading }] = useLoginUserEmailMutation();

  const onSubmit = (data: ILogin) => {
    loginUserEmail({ email: data.email, password: data.password })
      .unwrap()
      .then((res: ILoginUserEmail) => {
        dispatch(
          setLoginUser({
            access_token: res.token,
            refresh_token: res.token,
            userId: res.user.id,
            role: res.user.role.name,
            username: res.user.email,
            authorities: [res.user.role.name],
          }),
        );

        dispatch(setUserInfo(res.user));

        switch (res.user.role.name) {
          case RolesEnum.WEB_ADMIN:
          case RolesEnum.WEB_STAFF:
            return navigate(SiteMap.Dashboard.path);
          default:
            return navigate(SiteMap.Home.path);
        }
      })
      .catch((err) => {
        return {};
      });
  };
  return (
    <Spin spinning={isLoading}>
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
            {t('auth.Welcome')} 👋🏻
          </h5>
          <p>{t('auth.Please-sign-in')}</p>
        </Space>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputForm
              name='email'
              label={t('user.email')}
            />
            <InputForm
              name='password'
              label={t('user.password')}
              $type={TypeInput.Password}
            />

            <Space
              className={css`
                display: flex;
                justify-content: space-between;
                margin-bottom: 2rem;
              `}
            >
              <Space>
                <CheckBoxForm
                  labelCB={t('auth.Remember')}
                  name='remember'
                />
              </Space>
              <Link to={SiteMap.Auth.ForgotPassword.path}>
                <TextLink>{t('auth.forgot')} </TextLink>
              </Link>
            </Space>
            <Button
              type='submit'
              className={css`
                width: 100% !important;
                margin-bottom: 2rem;
              `}
            >
              {t('auth.title.login')}
            </Button>
          </form>
          <BoxCenter>
            {t('auth.new.platform')}
            <Link to={SiteMap.Auth.Register.path}>
              <TextLink
                className={css`
                  /* margin-left: 1rem; */
                `}
              >
                {t('auth.create.an.acount')}
              </TextLink>
            </Link>
          </BoxCenter>
          <BoxCenter
            className={css`
              margin: 2rem;
            `}
          >
            {t('auth.or')}
          </BoxCenter>

          <OAuth2ICons />
        </FormProvider>
      </div>
    </Spin>
  );
}

export default Login;
