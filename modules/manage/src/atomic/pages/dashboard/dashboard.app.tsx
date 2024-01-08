import { css } from '@emotion/css';
import { useCRUDContext, useMessageHook } from '@org/core';
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
  useGetUsersQuery,
  useLazyGetPaymentQuery,
} from '@org/store';
import {
  BoxBetween,
  BoxCenter,
  BoxFlex,
  Button,
  CalculatorOutlined,
  Col,
  DatePicker,
  DollarOutlined,
  PieChartOutlined,
  Row,
  Section,
  Space,
  UsergroupAddOutlined,
  useTable,
} from '@org/ui';
import { SiteMap, StatusEnum, formatMoney, statusOption } from '@org/utils';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
// import { Upsert } from './container/upsert';
import { Link } from 'react-router-dom';
import { BarChartBase } from './container/barChart';
import { GradeApp } from './container/grade';
import { SubjectApp } from './container/subject';
const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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

  const [getUser, { data, isLoading }] = useLazyGetPaymentQuery();
  const [getCount, { data: dataCount }] = useLazyGetPaymentQuery();

  const [deleteUser] = useDeleteAssessmentMutation();
  const [year, setYear] = useState(dayjs());
  const query = {
    page: 1,
    limit: 10000,
    status: 0,
    searchName: '',
    type: 0,
    year: year ? dayjs(year).format('YYYY') : null,
  };
  useEffect(() => {
    getUser(query);
  }, [JSON.stringify(query)]);
  useEffect(() => {
    getCount({});
  }, []);
  const count = useMemo(() => {
    const temp = dataCount?.data?.reduce((acc: any, current: any) => {
      if (
        !dayjs().isBefore(dayjs(data?.feeMonthDate), 'month') &&
        (current?.status === 1 || current?.status === 2)
      ) {
        return (acc = acc + current.amount);
      }
      return acc;
    }, 0);

    return temp;
  }, [dataCount?.data]);

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
  // const date1 = dayjs('2022-01-07');
  // const date2 = dayjs('2022-01-15');

  // const isSameMonthAndYear = date1.isSame(date2, 'month') && date1.isSame(date2, 'year');
  const amounts = useMemo(() => {
    return month?.map((month, i) => {
      // const amount =data?.data?.reduce((sum:any, amount:any) => sum + amount),0);
      let thu = 0;
      let hoahong = 0;
      let chi = 0;
      const monthYear = dayjs(`${year.format('YYYY')}-${month}-01`);
      data?.data?.forEach((data: any) => {
        console.log(
          monthYear.isSame(dayjs(data?.feeMonthDate), 'month') &&
            monthYear.isSame(dayjs(data?.feeMonthDate), 'year'),
        );
        if (
          monthYear.isSame(dayjs(data?.feeMonthDate), 'month') &&
          monthYear.isSame(dayjs(data?.feeMonthDate), 'year')
        ) {
          if (data?.receiver && data.status !== 4) {
            chi = chi + data?.amount;
            hoahong = hoahong + (data?.profits || 0);
          }
          if (data?.sender && data.status == 2) {
            thu = thu + data?.amount;
          }
        }
      });

      if (!monthYear.isBefore(dayjs(), 'month')) {
        thu = 0;
        hoahong = 0;
        chi = 0;
      }
      return {
        name: month,
        thu: thu,
        chi: chi,
        hoahong: hoahong,
      };
    });
    // return data?.data?.map((item: any) => {
    //   const day = 'year';
    //   return {
    //     name: getNameLanguage(item.nameVI, item.nameEN),
    //     uv:
    //       dataPost?.data?.filter((post: any) =>
    //         post?.gradeLevels?.some((gradeLevel: any) => gradeLevel.id === item.id),
    //       )?.length || 1,
    //     pv: 2400,
    //     amt: 2400,
    //   };
    // });
  }, [data?.data]);

  const dataSubject = useMemo(() => {
    return subjectActive?.map((item: any) => {
      return {
        name: getNameLanguage(item.nameVI, item.nameEN),
        sl: dataPost?.data?.filter((post: any) =>
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
                        background-color: #a8f0ab;
                        border-radius: 50%;
                        height: 44px;
                        width: 44px;
                      `}
                    >
                      <DollarOutlined style={{ color: 'green', fontSize: 20 }} />
                    </BoxCenter>

                    <Space>
                      <h4>{formatMoney(Number(String(count)?.slice(0, -3)))}K</h4>
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
                        background-color: #d6e9f5;
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
                        background-color: #dcd7eb;
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
                        background-color: #f2d9d9;
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

      <br />
      <Section>
        <DatePicker
          label={t('year')}
          picker={'year'}
          format='YYYY'
          options={statusOption}
          onChange={(value) => setYear(value)}
          className={css`
            min-width: 20rem;
            min-height: 3.8rem;
          `}
          value={year}
        />
        <BarChartBase data={amounts} />
      </Section>

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
