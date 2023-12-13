import { css } from '@emotion/css';
import { Authorization } from '@org/auth';
import {
  AddressForm,
  certificationImportFormat,
  gradeSubjectExport,
  gradeSubjectImportFormat,
  IWards,
  SelectCertification,
  SelectGradeSubject,
  SelectSkill,
  skillImportFormat,
  useCRUDContext,
  useMessageHook,
  useUnmount,
} from '@org/core';
import { getNameLanguage, i18next, useTranslation } from '@org/i18n';
import {
  useCreateUserTutorMutation,
  useLazyFindUserTutorQuery,
  useUpdateMeMutation,
  useUpdateUserTutorMutation,
} from '@org/store';
import {
  BoxCenter,
  Button,
  Col,
  DatePickerForm,
  Drawer,
  FormProvider,
  H3,
  InputForm,
  Row,
  SelectForm,
  SIZE,
  Spin,
  TextAreaForm,
  TimeAvailabilityForm,
  timeAvailabilityImport,
  TYPE_BUTTON,
  TypeInput,
  UnloadImageForm,
  UploadFilesForm1,
  useForm,
  VARIANT,
  yupResolver,
} from '@org/ui';

import {
  COLOR,
  getImage,
  RolesEnum,
  StatusEnum,
  statusOptionUpsert,
  TypeRolesEnum,
} from '@org/utils';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import * as yup from 'yup';

type Status = {
  id: string;
  name: string;
};
type IUpdate = {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  photo?: any[];
  status?: number;
  certification?: number[];
  skills?: number[];
  timeAvailability?: string[];
  tutorGradeSubject?: [];
  address?: string;
  province?: number;
  district?: number;
  wards?: number;
  accountNumberBank?: string;
  bio?: string;
  ownerBank?: string;
  nameBank?: string;
  phone?: string;
  oldPassword?: string;
  birthday?: string | undefined | any;
};

const schema = yup.object({
  email: yup.string().required(i18next.t('required.email')),
  password: yup.string(),
  lastName: yup.string().required(i18next.t('required.lastName')),
  firstName: yup.string().required(i18next.t('required.firstName')),
});
type TypeName = keyof IUpdate;
type IPhoto = {
  id: string;
  path: string;
};
const dataInit: IUpdate = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  photo: [],
  status: 1,
  certification: [],
  timeAvailability: [],
  address: '',
  tutorGradeSubject: [],
  province: undefined,
  district: undefined,
  wards: undefined,
  skills: [],
  accountNumberBank: '',
  bio: '',
  ownerBank: '',
  nameBank: '',
  phone: '',
  oldPassword: '',
  birthday: undefined,
};

export function Upsert({ dataUpsert, close, open, refetch }: any) {
  const { t } = useTranslation();
  const methods = useForm<IUpdate>({
    defaultValues: dataInit,

    resolver: yupResolver(schema),
  });

  const { messageError, messageSuccess, contextHolder } = useMessageHook();

  const [createData, { isLoading: isLoadingCreate }] = useCreateUserTutorMutation();

  const [getData, { isLoading: isLoadingGet }] = useLazyFindUserTutorQuery();

  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateMeMutation();

  const name = getNameLanguage('nameVI', 'nameEN');

  const handleSave = async (formData: any) => {
    updateUser(formData)
      .then(() => {
        messageSuccess(t('user.edit.success'));
      })
      .catch(() => {
        messageError(t('user.edit.error'));
      })
      .finally(() => {
        close();
        refetch();
      });
  };

  useEffect(() => {
    if (!isEmpty(dataUpsert)) {
      Object.entries(dataInit).forEach(([name, value]) => {
        const recordName = name as TypeName;

        const recordData = (dataUpsert as IUpdate)?.[name as TypeName];
        if (name === 'photo') {
          const photoArray = recordData
            ? [
                {
                  uid: (recordData as unknown as IPhoto)?.id || '',
                  status: 'done',
                  url: getImage((recordData as unknown as IPhoto)?.path),
                },
              ]
            : [];
          methods.setValue(recordName, photoArray);
          return;
        }
        if (name == 'status') {
          methods.setValue(recordName, (recordData as unknown as Status)?.id);
          return;
        }
        if (name == 'wards') {
          const wards = recordData as unknown as IWards;
          methods.setValue('wards', wards?.id);
          methods.setValue('district', wards?.districts?.id);
          methods.setValue('province', wards?.districts?.province?.id);
          return;
        }
        if (name == 'skills') {
          const skills = dataUpsert?.['tutorSkills'];
          methods.setValue('skills', skillImportFormat(skills));

          return;
        }
        if (name == 'certification') {
          const certification = dataUpsert?.['tutorCertifications'];
          methods.setValue('certification', certificationImportFormat(certification));
          return;
        }
        if (name == 'tutorGradeSubject') {
          const tutorGradeSubject = dataUpsert?.['tutorGradeSubject'];
          methods.setValue('tutorGradeSubject', gradeSubjectImportFormat(tutorGradeSubject));
          return;
        }
        if (name == 'timeAvailability') {
          const timeAvailability = dataUpsert?.['tutorTimeAvailability'];
          methods.setValue('timeAvailability', timeAvailabilityImport(timeAvailability));
          return;
        }
        if (name == 'birthday' && recordData) {
          methods.setValue('birthday', dayjs(String(recordData)));
          return;
        }

        methods.setValue(recordName, recordData || '');
      });
    }
  }, [JSON.stringify(dataUpsert)]);

  return (
    <>
      {contextHolder}

      <Drawer
        title={t('profile.edit.title')}
        placement={'right'}
        width={'100%'}
        onClose={close}
        open={open}
        extra={
          <BoxCenter>
            <Button
              onClick={close}
              $type={TYPE_BUTTON.Primary}
              $variant={VARIANT.Outlined}
              $size={SIZE.ExtraSmall}
            >
              {t('button.cancel')}
            </Button>
            <Button
              $type={TYPE_BUTTON.Primary}
              $size={SIZE.ExtraSmall}
              onClick={methods.handleSubmit((value) => {
                const formData = new FormData();
                Object.entries(value).forEach(([name, record]: [string, string | any]) => {
                  if (!record) return;

                  if (name === 'photo') {
                    if (record?.[0]?.originFileObj) {
                      formData.append(name, record?.[0]?.originFileObj);
                    }
                    return;
                  }
                  if (name === 'tutorGradeSubject') {
                    formData.append(name, gradeSubjectExport(record));
                    return;
                  }
                  if (name == 'birthday' && record) {
                    console.log(
                      '🚀 ~ file: upsert.tsx:257 ~ Object.entries ~ record:',
                      record.format('YYYY-MM-DD'),
                    );
                    formData.append('birthday', record?.format('YYYY-MM-DD'));
                    return;
                  }

                  formData.append(name, record);
                });

                handleSave(formData);
              })}
            >
              {t('button.save')}
            </Button>
          </BoxCenter>
        }
      >
        <Spin spinning={isLoadingCreate || isLoadingGet || isLoadingUpdate}>
          <FormProvider {...methods}>
            <BoxCenter>
              <UnloadImageForm
                maxLength={1}
                name='photo'
              />
            </BoxCenter>

            <Row gutter={[10, 10]}>
              <Col
                span={24}
                md={12}
              >
                <InputForm
                  name='firstName'
                  label={t('user.firstName')}
                />
              </Col>
              <Col
                span={24}
                md={12}
              >
                <InputForm
                  name='lastName'
                  label={t('user.lastName')}
                />
              </Col>
              <Col
                span={24}
                md={12}
              >
                <InputForm
                  name='email'
                  label={t('user.email')}
                />
              </Col>

              <Col
                span={24}
                md={12}
              >
                <InputForm
                  name='phone'
                  label={t('phone')}
                />
              </Col>
              <Col
                span={24}
                md={12}
              >
                <DatePickerForm
                  name='birthday'
                  label={t('birthday')}
                />
              </Col>
              <Col
                span={24}
                md={12}
              >
                <InputForm
                  name='school'
                  label={t('school')}
                />
              </Col>
            </Row>

            <AddressForm methods={methods} />
            <h2
              className={css`
                color: ${COLOR.Primary};
                font-size: 2.2rem;
                font-weight: 600;
                margin-bottom: 1rem;
              `}
            >
              {t('update.password')}
            </h2>
            <Row gutter={[10, 10]}>
              <Col
                span={24}
                md={12}
              >
                <InputForm
                  name='oldPassword'
                  label={t('user.password')}
                  $type={TypeInput.Password}
                />
              </Col>

              <Col
                span={24}
                md={12}
              >
                <InputForm
                  name='password'
                  label={t('user.new_password')}
                  $type={TypeInput.Password}
                />
              </Col>
            </Row>
            <Authorization
              type={TypeRolesEnum.IF_ANY_GRANTED}
              roles={[RolesEnum.PESONAL_TUTOR]}
            >
              <h2
                className={css`
                  color: ${COLOR.Primary};
                  font-size: 2.2rem;
                  font-weight: 600;
                  margin-bottom: 1rem;
                `}
              >
                {t('bank.title')}
              </h2>
              <Row gutter={[10, 10]}>
                <Col
                  span={24}
                  md={12}
                >
                  <InputForm
                    name='accountNumberBank'
                    label={t('accountNumberBank')}
                  />
                </Col>
                <Col
                  span={24}
                  md={12}
                >
                  <InputForm
                    name='ownerBank'
                    label={t('ownerBank')}
                  />
                </Col>
                <Col
                  span={24}
                  md={12}
                >
                  <InputForm
                    name='nameBank'
                    label={t('nameBank')}
                  />
                </Col>
              </Row>
              <h2
                className={css`
                  color: ${COLOR.Primary};
                  font-size: 2.2rem;
                  font-weight: 600;
                  margin-bottom: 1rem;
                `}
              >
                {t('exp')}
              </h2>
              <Row gutter={[10, 10]}>
                <Col
                  span={24}
                  md={24}
                >
                  <TextAreaForm
                    name='bio'
                    label={t('bio')}
                  />
                </Col>

                <Col span={12}>
                  <SelectSkill />
                </Col>

                <Col span={12}>
                  <SelectCertification />
                </Col>
                <Col
                  span={24}
                  md={12}
                >
                  <UploadFilesForm1
                    name='file'
                    label={t('file')}
                    maxLength={10}
                  />
                </Col>
              </Row>

              <SelectGradeSubject />
              <TimeAvailabilityForm
                name='timeAvailability'
                label={t('timeAvailability')}
              />
            </Authorization>
          </FormProvider>
        </Spin>
      </Drawer>
    </>
  );
}
