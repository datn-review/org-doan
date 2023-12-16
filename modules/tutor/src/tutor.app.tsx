import { css } from '@emotion/css';
import { useTranslation } from '@org/i18n';
import {
  setActiveGroup,
  useAppDispatch,
  useAppSelector,
  useGetUserTutorActiveQuery,
  useGetUserTutorQuery,
  useLazyGetUserTutorActiveQuery,
} from '@org/store';
import {
  Banner2,
  Banner3,
  BoxBetween,
  BoxCenter,
  Button,
  Col,
  FileSearchOutlined,
  FormProvider,
  Input,
  InputForm,
  ModalAntd,
  NoDataSvg,
  Pagination,
  Row,
  SIZE,
  Section,
  SectionLayout,
  Skeleton,
  Space,
  Spin,
  TextSection,
  VARIANT,
  useForm,
} from '@org/ui';
import { SiteMap } from '@org/utils';
import { useEffect, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { useNavigate, useParams } from 'react-router-dom';
import { CardTutor } from './atomic/atoms/Card';
import { SelectCertification, SelectGrade, SelectSkill, SelectSubject, useMount } from '@org/core';
import { isEmpty } from 'lodash';

function TutorApp() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const methods = useForm<any>({
    defaultValues: {},
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [getData, { data, isFetching, isSuccess }] = useLazyGetUserTutorActiveQuery();
  const limit = 12;

  useMount(() => {
    getData({
      sortBy: 'createdAt',
      sortDirection: 'asc',
      limit,
      page: currentPage,
    });
  });
  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.Tutor.menu }));
    return () => {
      dispatch(setActiveGroup({ current: '' }));
    };
  }, []);
  const submit = (value: any) => {
    getData({
      sortBy: 'createdAt',
      sortDirection: 'asc',
      limit,
      page: 1,
      grade: value.gradeLevel,
      skills: value.skills,
      subject: value.subject,
      certification: value.certification,
      searchName: value.searchName,
    });
    setIsShowFilter(false);
    setCurrentPage(1);
  };
  const close = () => setIsShowFilter(false);

  const clear = () => {
    methods.setValue('gradeLevel', undefined);
    methods.setValue('skills', undefined);
    methods.setValue('subject', undefined);
    methods.setValue('subject', undefined);
    getData({
      sortBy: 'createdAt',
      sortDirection: 'asc',
      limit: 10,
      page: 1,
    });
    setIsShowFilter(false);
    setCurrentPage(1);
  };
  return (
    <SectionLayout>
      <BoxBetween
        className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        `}
      >
        <TextSection left>{t('tutor')}</TextSection>
        <Button
          $size={SIZE.ExtraSmall}
          onClick={() => setIsShowFilter(true)}
        >
          <FileSearchOutlined />
          {t('search.title')}
        </Button>
      </BoxBetween>

      <Row gutter={[10, 10]}>
        <Col
          span={24}
          md={20}
        >
          <Skeleton loading={isFetching || !isSuccess}>
            <Row gutter={[10, 10]}>
              <If condition={!isEmpty(data?.data)}>
                <Then>
                  {data?.data?.map((item: any) => (
                    <CardTutor item={item} />
                  ))}
                </Then>
                <Else>
                  <BoxCenter
                    className={css`
                      width: 100%;
                    `}
                  >
                    <NoDataSvg />
                  </BoxCenter>
                </Else>
              </If>
            </Row>
            <If condition={!isEmpty(data?.data)}>
              <Then>
                <br></br>
                <BoxBetween>
                  <Space></Space>
                  <Pagination
                    defaultCurrent={currentPage}
                    current={currentPage}
                    defaultPageSize={limit}
                    pageSize={limit}
                    onChange={(value) => {
                      getData({
                        sortBy: 'createdAt',
                        sortDirection: 'asc',
                        limit,
                        page: value,
                        grade: methods.watch('gradeLevel'),
                        skills: methods.watch('skills'),
                        subject: methods.watch('subject'),
                        certification: methods.watch('certification'),
                        searchName: methods.watch('searchName'),
                      });
                      setCurrentPage(value);
                    }}
                    simple
                    total={data?.totals}
                  />
                </BoxBetween>
              </Then>
            </If>
          </Skeleton>
        </Col>
        <Col
          span={24}
          md={4}
        >
          <img
            src={Banner3}
            className={css`
              border-radius: 10px;
            `}
          />
          <br />

          <img
            src={Banner2}
            className={css`
              border-radius: 10px;
            `}
          />
          <br />
        </Col>
      </Row>

      <ModalAntd
        title={
          <Space
            className={css`
              width: 80%;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              input {
                border: unset !important;
                margin: 0;
                //text-align: center !important;
              }
            `}
          >
            <Space
              className={css`
                width: 10rem;
              `}
            >
              {t('search.title')}
            </Space>
          </Space>
        }
        open={isShowFilter}
        onCancel={close}
        width={'700px'}
        footer={
          <Space
            className={css`
              display: flex;
              justify-content: flex-end;
              gap: 1rem;
            `}
          >
            <Button
              // $size={SIZE.ExtraSmall}
              $variant={VARIANT.Outlined}
              onClick={methods.handleSubmit(clear)}
            >
              {t('clear')}
            </Button>
            <Button
              // $size={SIZE.ExtraSmall}
              onClick={methods.handleSubmit(submit)}
            >
              {t('search')}
            </Button>
          </Space>
        }
        // zIndex={999999}
      >
        <FormProvider {...methods}>
          <Row gutter={10}>
            <Col span={24}>
              <InputForm
                name='searchName'
                label={t('search.name')}
              />
            </Col>
            <Col span={6}>
              <SelectGrade />
            </Col>
            <Col span={6}>
              <SelectSkill single />
            </Col>
            <Col span={6}>
              <SelectCertification single />
            </Col>
            <Col span={6}>
              <SelectSubject />
            </Col>
          </Row>
        </FormProvider>
      </ModalAntd>
    </SectionLayout>
  );
}

export default TutorApp;
