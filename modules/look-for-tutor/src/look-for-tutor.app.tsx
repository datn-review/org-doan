import { css } from '@emotion/css';
import { Translation, getNameLanguage, i18nContant, i18next, useTranslation } from '@org/i18n';
import {
  setActiveGroup,
  useAppDispatch,
  useAppSelector,
  useCreatePostsMutation,
  useGetCertificationActiveQuery,
  useGetGradeLevelActiveQuery,
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
  TextAreaForm,
  TextSection,
  BoxCenter,
} from '@org/ui';
import { COLOR, SiteMap, dataTime, day, formatData } from '@org/utils';
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
  wards: yup.number().required(i18next.t('required.field')),
  // descriptionVI: yup.string(),
  // descriptionEN: yup.string(),
  // status: yup.number(),
});
// const dataInit: any = {
//   province: undefined,
//   district: undefined,
//   wards: undefined,
//   requestSummaryVI: '',
//   requestDetailVI: '',
//   address: '',
//   status: 1,
//   skill: [],
//   fee: 0,
//   perTime: 0,
//   dayWeek: 0,
//   type: 1,
//   timeAvailability: [],
//   certification: [],
//   gradeLevel: [],
//   skills: [],
//   subject: [],
// };
const dataInit: any = {
  province: 2,
  district: 3,
  wards: 1,
  requestSummaryVI: 'Mô tả yêu',
  requestDetailVI:
    '<p class="PlaygroundEditorTheme__paragraph" dir="ltr"><b><strong class="PlaygroundEditorTheme__textBold" style="white-space: pre-wrap;">Mô tả yêu</strong></b></p>',
  address: 'Mô tả yêu',
  status: 1,
  skill: [],
  fee: '100',
  perTime: 2,
  dayWeek: '10',
  type: 1,
  timeAvailability: ['3__0', '3__1', '3__2', '4__2', '4__3', '4__4'],
  certification: [2],
  gradeLevel: 2,
  skills: [1, 2],
  subject: [1, 2],
  timeStart: dayjs('2023-11-03T12:21:02.324Z'),
  timeDay: 2,
};

function LookForTutorApp() {
  const methods = useForm<any>({
    defaultValues: dataInit,

    resolver: yupResolver(schema),
  });

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [requestDetail, setRequestDetail] = useState('');

  const { data: dataSkills } = useGetSkillsActiveQuery({});
  const { data: dataCertification } = useGetCertificationActiveQuery({});
  const { data: dataGradeLevel } = useGetGradeLevelActiveQuery({});

  const { data: dataSubject } = useGetSubjectActiveQuery({});
  const [createPosts] = useCreatePostsMutation();

  const name = getNameLanguage('nameVI', 'nameEN');
  const skills = useMemo(() => {
    return formatData({ data: dataSkills, name });
  }, [name, dataSkills]);

  const certification = useMemo(() => {
    return formatData({ data: dataCertification, name });
  }, [name, dataCertification]);

  const gradeLevel = useMemo(() => {
    return formatData({ data: dataGradeLevel, name });
  }, [name, dataGradeLevel]);

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
    <Space className={'section-layout'}>
      <Space className={'look-for-tutor section'}>
        <If condition={isAuthenticated}>
          <Then>
            <FormProvider {...methods}>
              {/* <H2>{t('find.tutor')}</H2> */}
              <BoxCenter>
                <TextSection>{t('description.request.tutor')}</TextSection>
              </BoxCenter>
              <Row gutter={[10, 10]}>
                <Col span={24}>
                  <TextAreaForm
                    name='requestSummaryVI'
                    label={t('summary')}
                  />
                </Col>
                <Col span={24}>
                  <label
                    className={css`
                      display: block;
                      padding-bottom: 0.3rem;
                      font-size: 1.3rem;
                    `}
                  >
                    {t('summaryDetails')}
                  </label>
                  <Editor
                    onChange={(value) => setRequestDetail(value)}
                    defaultValue={
                      '<p class="PlaygroundEditorTheme__paragraph" dir="ltr"><b><strong class="PlaygroundEditorTheme__textBold" style="white-space: pre-wrap;">Mô tả yêu</strong></b></p>'
                    }
                  />
                </Col>
                <Col
                  span={24}
                  lg={6}
                >
                  <SelectForm
                    size='large'
                    name='gradeLevel'
                    label={t('grade')}
                    options={gradeLevel}
                    placeholder={t('please.select')}
                  />
                </Col>
                <Col
                  span={24}
                  lg={8}
                >
                  <SelectForm
                    size='large'
                    mode='multiple'
                    name='subject'
                    label={t('subject')}
                    options={subjects}
                    placeholder={t('please.select')}
                  />
                </Col>
                <Col
                  span={24}
                  lg={6}
                >
                  <DatePickerForm
                    name='timeStart'
                    label={t('timeStart')}
                    size={'large'}
                  />
                </Col>
                <Col
                  span={24}
                  lg={4}
                >
                  <SelectForm
                    size='large'
                    name='timeDay'
                    label={t('time_hours')}
                    options={dataTime}
                    placeholder={t('please.select')}
                    // placeholder='Please Select Hours Per Session'
                  />
                </Col>
              </Row>

              <AddressForm methods={methods} />
              <BoxCenter>
                <TextSection>{t('request.tutor')}</TextSection>
              </BoxCenter>
              <Row gutter={[10, 0]}>
                <Col
                  span={24}
                  lg={12}
                >
                  <SelectForm
                    size='large'
                    mode='multiple'
                    name='skills'
                    label={t('skill')}
                    options={skills}
                    placeholder={t('please.select')}
                  />
                </Col>
                <Col
                  span={24}
                  lg={12}
                >
                  <SelectForm
                    size='large'
                    mode='multiple'
                    name='certification'
                    label={t('certification')}
                    placeholder={t('please.select')}
                    options={certification}
                  />
                </Col>

                <Col
                  span={24}
                  lg={8}
                >
                  <InputForm
                    name='fee'
                    label={t('fee')}
                    placeholder='Ex: 300000'
                  />
                </Col>
                <Col
                  span={24}
                  lg={8}
                >
                  <SelectForm
                    size='large'
                    name='perTime'
                    label={t('perTime')}
                    placeholder='Please select per'
                    options={day}
                  />
                </Col>
                <Col
                  span={24}
                  lg={8}
                >
                  <InputForm
                    name='dayWeek'
                    label={t('day/week')}
                    placeholder='Ex: 3'
                  />
                </Col>
                <Col span={24}>
                  <TimeAvailabilityForm
                    name='timeAvailability'
                    label={t('timeAvailability')}
                  />
                </Col>
              </Row>
              <Button
                $type={TYPE_BUTTON.Primary}
                onClick={methods.handleSubmit((values) => {
                  console.log(dayjs(values?.['timeStart']).format('YYYY-MM-DD'));
                  createPosts({
                    ...values,
                    gradeLevel: [values.gradeLevel],
                    timeStart: dayjs(values?.['timeStart']),
                    requestDetailVI: requestDetail,
                  });
                })}
              >
                {t('button.save')}
              </Button>
            </FormProvider>
          </Then>
          <Else>
            <Link to={SiteMap.Auth.Login.path}>
              <Button>{t('login')}</Button>
            </Link>
          </Else>
        </If>
      </Space>
    </Space>
  );
}

export default LookForTutorApp;
