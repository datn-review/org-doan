import { css } from '@emotion/css';
import { getNameLanguage, i18next, useTranslation } from '@org/i18n';
import {
  setActiveGroup,
  useAppDispatch,
  useAppSelector,
  useGetCertificationActiveQuery,
  useGetSkillsActiveQuery,
  useGetSubjectActiveQuery,
  useLazyGetSkillsQuery,
} from '@org/store';
import {
  Button,
  Space,
  H2,
  FormProvider,
  yupResolver,
  useForm,
  InputForm,
  H3,
  SelectForm,
  Row,
  Col,
  DatePicker,
  DatePickerForm,
  TYPE_BUTTON,
  CascaderPanelForm,
  TimeAvailabilityForm,
} from '@org/ui';
import { COLOR, SiteMap, formatData } from '@org/utils';
import { useEffect, useMemo, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AddressForm } from '@org/core';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { Editor } from '@org/editor';
const schema = yup.object({
  province: yup.number().required(i18next.t('required.field')),
  district: yup.number().required(i18next.t('required.field')),
  ward: yup.number().required(i18next.t('required.field')),
  // descriptionVI: yup.string(),
  // descriptionEN: yup.string(),
  // status: yup.number(),
});
const dataInit: any = {
  province: undefined,
  district: undefined,
  ward: undefined,
  descriptionEN: '',
  status: 1,
  skill: [],
  per: 1,
  timeAvailability: [],
};
const dataTime = [
  {
    value: 1,
    label: `30 ${i18next.t('min')}`,
  },
  {
    value: 2,
    label: `45 ${i18next.t('min')}`,
  },
  {
    value: 3,
    label: `60 ${i18next.t('min')}`,
  },
  {
    value: 4,
    label: `90 ${i18next.t('min')}`,
  },
  {
    value: 5,
    label: `120 ${i18next.t('min')}`,
  },
  {
    value: 6,
    label: `2 ${i18next.t('hours')}`,
  },
];

const day = [
  {
    value: 1,
    label: `${i18next.t('month')}`,
  },
  {
    value: 2,
    label: `${i18next.t('week')}`,
  },
  {
    value: 3,
    label: `${i18next.t('day')}`,
  },
];

function LookForTutorApp() {
  const methods = useForm<any>({
    defaultValues: dataInit,

    resolver: yupResolver(schema),
  });

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: dataSkills } = useGetSkillsActiveQuery({});
  const { data: dataCertification } = useGetCertificationActiveQuery({});

  const { data: dataSubject } = useGetSubjectActiveQuery({});
  const name = getNameLanguage('nameVI', 'nameEN');
  const skills = useMemo(() => {
    return formatData({ data: dataSkills, name });
  }, [name, dataSkills]);

  const certification = useMemo(() => {
    return formatData({ data: dataCertification, name });
  }, [name, dataCertification]);

  const subjects = useMemo(() => {
    return formatData({ data: dataSubject, name });
  }, [name, dataSubject]);
  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.LookForTutor.menu }));
    return () => {
      dispatch(setActiveGroup({ current: '' }));
    };
  }, []);
  return (
    <>
      <Space className={'look-for-tutor section'}>
        <If condition={isAuthenticated}>
          <Then>
            <FormProvider {...methods}>
              {/* <H2>{t('find.tutor')}</H2> */}

              <H3>Mô tả yêu cầu tìm gia sư</H3>
              <Row gutter={[10, 10]}>
                <Col span={24}>
                  <InputForm
                    name='content'
                    label='Mô tả chi tiết *'
                  />
                  <Editor />
                </Col>
                <Col span={8}>
                  <SelectForm
                    size='large'
                    mode='multiple'
                    name='subject'
                    label={t('subject')}
                    options={subjects}
                    placeholder='Please Select Subject'
                  />
                </Col>
                <Col span={8}>
                  <DatePickerForm
                    name='time_start'
                    label='Time Start'
                    size={'large'}
                  />
                </Col>
                <Col span={8}>
                  <SelectForm
                    size='large'
                    name='time_hours'
                    label={t('time_hours')}
                    options={dataTime}
                    placeholder='Please Select Hours Per Session'
                  />
                </Col>
              </Row>

              <AddressForm methods={methods} />
              <H3>Yêu Cầu Gia Sư</H3>
              <Row gutter={[10, 0]}>
                <Col span={12}>
                  <SelectForm
                    size='large'
                    mode='multiple'
                    name='skill'
                    label={t('skill')}
                    options={skills}
                    placeholder='Please Select Skill'
                  />
                </Col>
                <Col span={12}>
                  <SelectForm
                    size='large'
                    mode='multiple'
                    name='certification'
                    label={t('Certification')}
                    placeholder='Please Select Certification'
                    options={certification}
                  />
                </Col>

                <Col span={8}>
                  <InputForm
                    name='fee'
                    label={t('fee')}
                    placeholder='Ex: 300000'
                  />
                </Col>
                <Col span={8}>
                  <SelectForm
                    size='large'
                    name='per'
                    label={t('per')}
                    placeholder='Please select per'
                    options={day}
                  />
                </Col>
                <Col span={8}>
                  <InputForm
                    name='fee-week'
                    label={t('fee/week')}
                    placeholder='Ex: 3'
                  />
                </Col>
                <Col span={24}>
                  <TimeAvailabilityForm
                    name='timeAvailability'
                    label={'Time Availability'}
                  />
                </Col>
              </Row>
              <Button
                $type={TYPE_BUTTON.Primary}
                onClick={methods.handleSubmit((value) => {
                  console.log(dayjs(value?.['time_start']).format('YYYY-MM-DD'));

                  console.log(
                    '🚀 ~ file: look-for-tutor.app.tsx:144 ~ onClick={methods.handleSubmit ~ value:',
                    value,
                  );
                })}
              >
                {t('button.save')}
              </Button>
            </FormProvider>
          </Then>
          <Else>
            <Link to={SiteMap.Auth.Login.path}>
              <Button>Login</Button>
            </Link>
          </Else>
        </If>
      </Space>
    </>
  );
}

export default LookForTutorApp;