import { css } from '@emotion/css';
import { useCRUDContext, useMessageHook, useUpdateEffect } from '@org/core';
import { getNameLanguage, useTranslation } from '@org/i18n';
import {
  clearActiveMenu,
  setActiveGroup,
  setActiveSubGroup,
  useAppDispatch,
  useDeleteAssessmentMutation,
  useGetClassesAllQuery,
  useGetGradeLevelActiveQuery,
  useGetPostsActiveQuery,
  useGetSubjectActiveQuery,
  useGetUserAdminQuery,
  useGetUsersQuery,
  useLazyGetClassesAllQuery,
  useLazyGetUserAdminQuery,
} from '@org/store';
// import { useDeleteDashboardMutation, useLazyGetDashboardQuery } from '@org/store';
import {
  BoxBetween,
  BoxCenter,
  BoxFlex,
  Button,
  CalculatorOutlined,
  ClockCircleOutlined,
  Col,
  DollarOutlined,
  H2,
  IconDeleteAction,
  IconEditAction,
  Input,
  PieChartOutlined,
  Row,
  Section,
  Select,
  SelectLimitTable,
  Space,
  Table,
  Tag,
  UsergroupAddOutlined,
  useTable,
} from '@org/ui';
import {
  COLOR,
  SiteMap,
  StatusEnum,
  StatusEnumColor,
  StatusShowHide,
  StatusShowHideColor,
  formatMoney,
  statusOption,
} from '@org/utils';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { Upsert } from './container/upsert';
import { GradeApp } from './container/grade';
import { SubjectApp } from './container/subject';
import { Link } from 'react-router-dom';

function DashboardApp() {
  const tableInstance = useTable({
    initialSortValue: {
      sortBy: 'name',
      sortDirection: 'asc',
    },
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { messageSuccess, contextHolder } = useMessageHook();

  const { setIdEdit, setIsUpsert, isFetch, setIsFetch, isUpsert } = useCRUDContext();

  const [filter, setFilter] = useState({
    status: StatusEnum.all,
    name: '',
  });

  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.Dashboard.menu }));
    dispatch(setActiveSubGroup({ current: SiteMap.Dashboard.menu }));
    return () => {
      dispatch(clearActiveMenu());
    };
  }, []);

  // const [getUser, { data, isLoading }] = useLazyGetUserAdminQuery();

  const { data: dataUser } = useGetUsersQuery({});
  const { data: dataPost } = useGetPostsActiveQuery({});
  const { data: classes } = useGetClassesAllQuery({});
  const { data: gradeLevel } = useGetGradeLevelActiveQuery({});
  const { data: subjectActive } = useGetSubjectActiveQuery({});

  const [deleteUser] = useDeleteAssessmentMutation();

  const query = {
    page: tableInstance.values.pagination.currentPage,
    limit: tableInstance.limit,
    status: filter.status,
    searchName: filter.name,
    sortBy: tableInstance.values.sort.sortBy,
    sortDirection: tableInstance.values.sort.sortDirection,
  };

  const dataGrade = useMemo(() => {
    return gradeLevel?.map((item: any) => {
      return {
        name: getNameLanguage(item.nameVI, item.nameEN),
        uv:
          dataPost?.data?.filter((post: any) =>
            post?.gradeLevels?.some((gradeLevel: any) => gradeLevel.id === item.id),
          )?.length || 1,
        pv: 2400,
        amt: 2400,
      };
    });
  }, [gradeLevel, dataPost]);

  const dataSubject = useMemo(() => {
    return subjectActive?.map((item: any) => {
      return {
        name: getNameLanguage(item.nameVI, item.nameEN),
        uv: dataPost?.data?.filter((post: any) =>
          post?.subjects?.some((subject: any) => subject.id === item.id),
        )?.length,
        pv: 2400,
        amt: 2400,
      };
    });
  }, [subjectActive, dataPost]);

  return (
    <Space
      className={css`
        h4 {
          font-weight: 600 !important;
          margin-bottom: 0.5rem;
          font-size: 19px !important;
        }
      `}
    >
      {contextHolder}
      <Row gutter={[20, 20]}>
        <Col
          span={24}
          md={24}
          lg={8}
        >
          <Section
            className={css`
              height: 100%;
            `}
          >
            <BoxBetween
              className={css`
                align-items: flex-start;
              `}
            >
              <Space
                className={css`
                  padding-top: 1rem;
                  padding-left: 1rem;
                `}
              >
                <h4>
                  {t('Congratulations')} {'Tutor'}! 🎉{' '}
                </h4>
                <Space>{t('Best Tutor of the month')}</Space>
                <br />
                <Space>
                  <Link
                    to={SiteMap.Profile.generate(5)}
                    className={css`
                      width: auto;
                    `}
                  >
                    <Button>{t('tutor.view')}</Button>
                  </Link>
                </Space>
              </Space>

              <img
                className='v-img__img v-img__img--contain'
                src='https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-5/assets/congo-illustration-d94260b0.png'
              />
            </BoxBetween>
          </Section>
        </Col>
        <Col
          span={24}
          md={24}
          lg={16}
        >
          <Section
            className={css`
              padding: 2rem 2rem 4rem !important;

              height: 100%;
            `}
          >
            <BoxBetween>
              <h4>{t('Statistics')}</h4>
              <h6>{t('Updated.1.month')}</h6>
            </BoxBetween>
            <br />

            <Row gutter={[20, 20]}>
              <Col
                span={12}
                md={12}
                lg={6}
              >
                <Space>
                  <BoxFlex
                    className={css`
                      gap: 1rem;
                    `}
                  >
                    <BoxCenter
                      className={css`
                        background-color: #99e59c;
                        border-radius: 50%;
                        height: 44px;
                        width: 44px;
                      `}
                    >
                      <DollarOutlined style={{ color: 'green', fontSize: 20 }} />
                    </BoxCenter>

                    <Space>
                      <h4>{formatMoney(1400000)}</h4>
                      <h6>{t('Revenue')}</h6>
                    </Space>
                  </BoxFlex>
                </Space>
              </Col>
              <Col
                span={12}
                sm={12}
                lg={6}
              >
                <Space>
                  <BoxFlex
                    className={css`
                      gap: 1rem;
                    `}
                  >
                    <BoxCenter
                      className={css`
                        background-color: #b3cbdc;
                        border-radius: 50%;
                        height: 44px;
                        width: 44px;
                      `}
                    >
                      <UsergroupAddOutlined style={{ color: '#006bb2', fontSize: 20 }} />
                    </BoxCenter>

                    <Space>
                      <h4>{dataUser?.length}</h4>
                      <h6>{t('Customers')}</h6>
                    </Space>
                  </BoxFlex>
                </Space>
              </Col>
              <Col
                span={12}
                sm={12}
                lg={6}
              >
                <Space>
                  <BoxFlex
                    className={css`
                      gap: 1rem;
                    `}
                  >
                    <BoxCenter
                      className={css`
                        background-color: #bbb6c9;
                        border-radius: 50%;
                        height: 44px;
                        width: 44px;
                      `}
                    >
                      <PieChartOutlined style={{ color: '#3b2773', fontSize: 20 }} />
                    </BoxCenter>

                    <Space>
                      <h4>{dataPost?.totals}</h4>
                      <h6>{t('post.length')}</h6>
                    </Space>
                  </BoxFlex>
                </Space>
              </Col>
              <Col
                span={12}
                sm={12}
                lg={6}
              >
                <Space>
                  <BoxFlex
                    className={css`
                      gap: 1rem;
                    `}
                  >
                    <BoxCenter
                      className={css`
                        background-color: #f8c1c1;
                        border-radius: 50%;
                        height: 44px;
                        width: 44px;
                      `}
                    >
                      <CalculatorOutlined style={{ color: '#ff0000', fontSize: 20 }} />
                    </BoxCenter>

                    <Space>
                      <h4>{classes?.totals}</h4>
                      <h6>{t('classes.length')}</h6>
                    </Space>
                  </BoxFlex>
                </Space>
              </Col>
            </Row>
          </Section>
        </Col>
      </Row>

      <br />
      <Row gutter={[20, 20]}>
        <Col
          span={24}
          sm={24}
          lg={12}
        >
          <Section>
            <BoxCenter>
              <GradeApp data={dataGrade} />
            </BoxCenter>
            <BoxCenter>
              <h4>{t('find.grade')}</h4>
            </BoxCenter>
          </Section>
        </Col>
        <Col
          span={24}
          sm={24}
          lg={12}
        >
          <Section>
            <BoxCenter>
              <SubjectApp data={dataSubject} />
            </BoxCenter>
            <BoxCenter>
              <h4>{t('find.subject')}</h4>
            </BoxCenter>
          </Section>
        </Col>
      </Row>

      {/* <Table
        tableInstance={tableInstance}
        totalPage={data?.totals}
        columns={columns}
        data={data?.data}
        loading={isLoading}
      /> */}

      {/* {isUpsert && <Upsert />} */}
    </Space>
  );
}

export default DashboardApp;
