import { css } from '@emotion/css';
import { defauOptions, useCRUDContext, useMessageHook, useUpdateEffect } from '@org/core';
import { getNameLanguage, useTranslation } from '@org/i18n';
import {
  clearActiveMenu,
  setActiveGroup,
  setActiveSubGroup,
  useAppDispatch,
  useLazyGetClassesAllQuery,
  useLazyGetCollaborationQuery,
} from '@org/store';
import { useDeletePaymentMutation, useLazyGetPaymentQuery } from '@org/store';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';
import {
  Button,
  DatePicker,
  H2,
  IconDeleteAction,
  IconEditAction,
  Input,
  SIZE,
  Section,
  SectionLayout,
  Select,
  SelectLimitTable,
  Space,
  Table,
  Tag,
  useTable,
} from '@org/ui';
import {
  COLOR,
  RolesEnum,
  SiteMap,
  StatusEnum,
  StatusEnumColor,
  StatusPay,
  StatusPayColor,
  StatusShowHide,
  StatusShowHideColor,
  day,
  formatMoney,
  statusOption,
  typePayment,
} from '@org/utils';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { Upsert } from './container/upsert';
import { ifAnyGranted } from '@org/auth';

function PaymentApp() {
  const tableInstance = useTable({
    initialSortValue: {
      sortBy: 'createdAt',
      sortDirection: 'asc',
    },
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { messageSuccess, contextHolder } = useMessageHook();

  const { setIdEdit, setIsUpsert, isFetch, setIsFetch, isUpsert } = useCRUDContext();

  const [filter, setFilter] = useState({
    status: StatusEnum.all,
    type: 0,
    month: null,
    year: null,
    name: '',
    collaboration: 0,
  });

  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.Payment.menu }));
    dispatch(setActiveSubGroup({ current: SiteMap.Payment.menu }));
    return () => {
      dispatch(clearActiveMenu());
    };
  }, []);

  const [getUser, { data, isLoading }] = useLazyGetPaymentQuery();
  const [getUserCSV, { data: dataCSV }] = useLazyGetPaymentQuery();

  const [getCollaboration, { data: classes }] = useLazyGetClassesAllQuery();
  const dataClass = useMemo(() => {
    return (
      classes?.data?.map((item: any) => {
        let subjectString = '';
        item?.posts?.subjects?.forEach((subject: any, index: number) => {
          if (index === 0) {
            subjectString = getNameLanguage(subject?.nameVI, subject?.nameEN);
          } else {
            subjectString =
              subjectString + ' - ' + getNameLanguage(subject?.nameVI, subject?.nameEN);
          }
        });
        return {
          label: `[#CLASS${item?.id}] ${subjectString}`,
          value: item?.id,
        };
      }) || []
    );
  }, [classes]);

  const [deleteUser] = useDeletePaymentMutation();

  const query = {
    page: tableInstance.values.pagination.currentPage,
    limit: tableInstance.limit,
    status: filter.status,
    searchName: filter.name,
    type: filter.type,
    month: filter.month ? dayjs(filter.month).format('MM') : null,
    year: filter.year ? dayjs(filter.year).format('YYYY') : null,
    collaboration: filter.collaboration,
    sortBy: tableInstance.values.sort.sortBy,
    sortDirection: tableInstance.values.sort.sortDirection,
  };
  useEffect(() => {
    getCollaboration({});
  }, []);

  useEffect(() => {
    getUser(query);
    getUserCSV({ ...query, limit: 10000000, page: 1 });
  }, [JSON.stringify(query)]);

  useUpdateEffect(() => {
    if (isFetch) {
      getUser({
        ...query,
        page: 1,
      });
      getUserCSV({ ...query, limit: 10000000, page: 1 });
      tableInstance.reset();
      setIsFetch(false);
    }
  }, [isFetch]);

  const columns = [
    {
      key: 'feeMonthDate',
      title: t('fee.content'),
      dataIndex: 'feeMonthDate',
      render: (feeMonthDate: string, record: any) => (
        <>
          {record?.receiver ? t('fee.pay.tutor') : t('fee.pay.student')}
          {dayjs(feeMonthDate).format('MM/YYYY')}
        </>
      ),
    },
    {
      key: 'name',
      title: t('user.name'),
      dataIndex: 'feeMonthDate',
      render: (feeMonthDate: string, record: any) => (
        <Link to={SiteMap.Profile.generate(record?.receiver?.id || record?.sender?.id)}>
          {record?.receiver
            ? record?.receiver?.lastName + ' ' + record?.receiver?.firstName
            : record?.sender?.lastName + ' ' + record?.sender?.firstName}
        </Link>
      ),
    },
    {
      key: 'fee',
      title: t('fee.amount'),
      dataIndex: 'amount',
      render: (amount: number) => <>{formatMoney(amount)}</>,
    },
    {
      key: 'deadPaymentDate',
      title: t('fee.deadPaymentDate'),
      dataIndex: 'deadPaymentDate',
      render: (deadPaymentDate: string, record: any) => (
        <>{deadPaymentDate && dayjs(deadPaymentDate).format('DD/MM/YYYY')}</>
      ),
    },
    {
      key: 'payRef',
      title: t('pay.transactionId'),
      dataIndex: 'payRef',
    },

    // {
    //   title: t('user.createdAt'),
    //   dataIndex: 'updatedAt',

    //   render: (_createdAt: string) => <>{dayjs(_createdAt).format('DD/MM/YYYY')}</>,
    // },
    {
      title: t('user.status'),

      dataIndex: 'status',
      key: 'status',
      render: (_: any, record: any) => {
        let status = record.status;
        if (dayjs(record.deadPaymentDate).isBefore(dayjs()) && status !== 2) {
          status = 3;
        }
        if (record?.receiver) return null;
        return (
          <Tag color={StatusPayColor[status as keyof typeof StatusShowHideColor]}>
            {t(`${StatusPay[status as keyof typeof StatusPay]}${record?.receiver ? '.tutor' : ''}`)}
          </Tag>
        );
      },
    },

    // {
    //   title: t('user.action'),
    //   dataIndex: '',
    //   render: (_: any, record: any) => {
    //     let status = record.status;
    //     if (dayjs(record.deadPaymentDate).isBefore(dayjs()) && status !== 2) {
    //       status = 3;
    //     }
    //     if (record?.receiver) return null;
    //     if (ifAnyGranted([RolesEnum.PESONAL_TUTOR])) return null;
    //     return (
    //       <Space
    //         className={css`
    //           display: flex;
    //           align-items: center;
    //           gap: 0.5rem;
    //           cursor: pointer;
    //         `}
    //       >
    //         {status === 1 && (
    //           <Button
    //             $size={SIZE.ExtraSmall}
    //             // onClick={() => setPaymentRow(record)}
    //           >
    //             {t('payment.title')}
    //           </Button>
    //         )}
    //         {/* {status === 2 && <Button>{t('pay.active')}</Button>} */}

    //         {/* {status === 3 && <Button>{t('pay.expired')}</Button>} */}
    //       </Space>
    //     );
    //   },
    // },
  ];
  const headers = [
    { label: 'Tên Giao Dịch', key: 'title' },
    { label: 'Họ Và Tên', key: 'fullName' },
    { label: 'Số Tiền', key: 'amount' },

    { label: 'Tên Trên Thẻ', key: 'accountFullNameBank' },
    { label: 'Số Tài Khoản', key: 'accountNumberBank' },
    { label: 'Tên Ngân Hàng', key: 'nameBank' },
  ];
  const dataExport = useMemo(() => {
    return (
      data?.data?.map((record: any) => ({
        title: record?.receiver
          ? t('fee.pay.tutor')
          : t('fee.pay.student') + ' ' + dayjs(record?.feeMonthDate).format('MM/YYYY'),
        fullName: record?.receiver
          ? record?.receiver?.lastName + ' ' + record?.receiver?.firstName
          : record?.sender?.lastName + ' ' + record?.sender?.firstName,
        amount: record?.amount,
        accountNumberBank: record?.accountNumberBank || t('updating'),
        accountFullNameBank: record?.accountNumberBank || t('updating'),
        nameBank: record?.accountNumberBank || t('updating'),
      })) || []
    );
  }, [dataCSV?.data]);

  // ];
  const csvReport = {
    data: dataExport,
    headers: headers,
    filename: 'Luong_Gia_Su.csv',
  };

  return (
    <Section>
      {contextHolder}
      <Space
        className={css`
          padding-bottom: 2rem;
          border-bottom: 1px solid #bcbcbc71;
          margin-bottom: 3rem;
        `}
      >
        <H2>{t('settings.payment')}</H2>

        <Space
          className={css`
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 2rem;
            gap: 1rem;
            flex-wrap: wrap;
          `}
        >
          <Select
            label={t('user.status')}
            options={statusOption}
            defaultValue={StatusEnum.active}
            value={filter.status}
            onChange={(value) => setFilter((prev) => ({ ...prev, status: value }))}
            className={css`
              min-width: 20rem;
              min-height: 3.8rem;
            `}
          />
          <Select
            label={t('payment.type')}
            options={typePayment}
            defaultValue={0}
            value={filter.type}
            onChange={(value) => setFilter((prev) => ({ ...prev, type: value }))}
            className={css`
              min-width: 20rem;
              min-height: 3.8rem;
            `}
          />
          <Select
            label={t('payment.classes')}
            options={[defauOptions, ...dataClass]}
            defaultValue={0}
            value={filter.collaboration}
            onChange={(value) => setFilter((prev) => ({ ...prev, collaboration: value }))}
            className={css`
              min-width: 20rem;
              min-height: 3.8rem;
            `}
          />
          <Space>
            <label
              className={css`
                display: block;
                padding-bottom: 0.3rem;
                font-size: 1.3rem;
              `}
            >
              {t('month')}
            </label>
            <DatePicker
              label={t('month')}
              format='MM'
              options={statusOption}
              onChange={(value) => setFilter((prev) => ({ ...prev, month: value }))}
              className={css`
                min-width: 20rem;
                min-height: 3.8rem;
              `}
              picker={'month'}
              dropdownClassName={css`
                .ant-picker-header {
                  display: none !important;
                }
              `}
            />
          </Space>
          <Space>
            <label
              className={css`
                display: block;
                padding-bottom: 0.3rem;
                font-size: 1.3rem;
              `}
            >
              {t('year')}
            </label>
            <DatePicker
              label={t('year')}
              picker={'year'}
              format='YYYY'
              options={statusOption}
              onChange={(value) => setFilter((prev) => ({ ...prev, year: value }))}
              className={css`
                min-width: 20rem;
                min-height: 3.8rem;
              `}
            />
          </Space>
        </Space>
      </Space>
      <Space
        className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        `}
      >
        <SelectLimitTable
          defaultValue={tableInstance.limit}
          onChange={tableInstance.onChangeLimit}
        />

        <Space
          className={css`
            gap: 0.5rem;
            display: flex;
            align-items: center;
          `}
        >
          <Space
            className={css`
              width: 18rem;
            `}
          >
            <Input
              name='seach_name'
              onChange={(value) => setFilter((prev) => ({ ...prev, name: String(value) }))}
              value={filter.name}
              placeholder={t('search.name')}
              className={css`
                margin-bottom: 0;
              `}
            />
          </Space>

          <Button>
            <CSVLink {...csvReport}>{t('export.csv')}</CSVLink>
          </Button>
        </Space>
      </Space>
      <Table
        tableInstance={tableInstance}
        totalPage={data?.totals}
        columns={columns}
        data={data?.data}
        loading={isLoading}
      />

      {isUpsert && <Upsert />}
    </Section>
  );
}

export default PaymentApp;
