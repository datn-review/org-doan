import { css } from '@emotion/css';
import { i18nContant, useTranslation } from '@org/i18n';
import { useAppDispatch, useRegisterUserEmailMutation } from '@org/store';
import {
  BoxCenter,
  Button,
  CheckBoxForm,
  FormProvider,
  InputForm,
  ModalAntd,
  Radio,
  Space,
  Spin,
  TextLink,
  message,
  useForm,
  yupResolver,
} from '@org/ui';
import { RolesEnum, SiteMap } from '@org/utils';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import IconEmail from '../../../assets/images/icons8-email-100.png';
import OAuth2ICons from '../../atoms';
interface IRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  policy?: boolean;
}
const typeRoles = [
  {
    value: RolesEnum.STUDENT,
    label: i18nContant('student'),
  },
  {
    value: RolesEnum.PARENT,
    label: i18nContant('parent'),
  },
  {
    value: RolesEnum.PESONAL_TUTOR,
    label: i18nContant('tutor'),
  },
];
const schema = yup.object({
  firstName: yup.string().required('firstName required.'),
  lastName: yup.string().required('lastName required.'),
  email: yup.string().required('Email required.'),
  password: yup.string().required('Password required'),
  policy: yup.boolean(),
});

function RegisterApp() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const [type, setType] = useState(RolesEnum.STUDENT);
  const [confirm, setConfirm] = useState(false);

  const methods = useForm<IRegister>({
    defaultValues: {
      email: '',
      policy: false,
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
        type,
      })
        .unwrap()
        .then(() => {
          // messageApi.open({
          //   type: 'success',
          //   content: 'Vui lòng xác nhận địa chi email của bạn ở hộp thư!',
          //   duration: 5,
          // });
          // setTimeout(() => {
          //   navigate(SiteMap.Auth.Login.path);
          // }, 5000);
          setConfirm(true);
        })
        .catch((err) => {});
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
            {t('auth.Welcome')} 👋🏻
          </h5>
          <p>{t('auth.Make-your')}</p>
        </Space>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <BoxCenter>
              <Radio.Group
                options={typeRoles}
                onChange={(e: any) => setType(e.target.value)}
                value={type}
              />
            </BoxCenter>
            <br />
            <InputForm
              name='firstName'
              label={t('user.firstName')}
            />
            <InputForm
              name='lastName'
              label={t('user.lastName')}
            />
            <InputForm
              name='email'
              label={t('user.email')}
            />
            <InputForm
              name='password'
              label={t('user.password')}
            />

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
                      {t('auth.I-agree')}
                      <TextLink>{t('auth.privacy-policy')} </TextLink>
                    </Link>
                  }
                  name='policy'
                />
              </Space>
            </Space>
            <Button
              type='submit'
              className={css`
                width: 100% !important;
                margin-bottom: 2rem;
              `}
            >
              {t('auth.title.register')}
            </Button>
          </form>
          <BoxCenter>
            {t('auth.Already')}

            <Link to={SiteMap.Auth.Login.path}>
              <TextLink
                className={css`
                  /* margin-left: 1rem; */
                `}
              >
                {t('auth.Sign.in.instead')}
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
      <ModalAntd
        title={
          <Space
            className={css`
              display: flex;
              justify-content: flex-start;
              align-items: center;
            `}
          >
            {t('auth.confirm')}
          </Space>
        }
        open={confirm}
        onCancel={() => setConfirm(false)}
        onOk={() => navigate(SiteMap.Auth.Login.path)}
        footer={
          <Space
            className={css`
              display: flex;
              justify-content: flex-end;
              align-items: center;
            `}
          >
            <Button
              onClick={() => {
                navigate(SiteMap.Auth.Login.path);
              }}
            >
              {t('OK')}
            </Button>
          </Space>
        }
      >
        {t('auth.please.confirm')}
        <BoxCenter>
          <img src={IconEmail}></img>
        </BoxCenter>
      </ModalAntd>
    </Spin>
  );
}

export default RegisterApp;
