import { css } from '@emotion/css';
import { useTranslation } from '@org/i18n';
import { Button, SIZE, Space, Table, Tag, useTable } from '@org/ui';
import { RolesEnum, StatusPay, StatusPayColor, StatusShowHideColor, formatMoney } from '@org/utils';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Payment } from '../payment';
import { ifAnyGranted } from '@org/auth';

export function FeeInfomation({ payments = [] }: any) {
  const { t } = useTranslation();
  console.log(payments);
  const [paymentRow, setPaymentRow] = useState(null);
  const payment = [...payments]?.sort((a: any, b: any) => a.id - b.id);
  const tableInstance = useTable({
    initialSortValue: {
      sortBy: '',
      sortDirection: '',
    },
  });
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
        <> {deadPaymentDate ? dayjs(deadPaymentDate).format('DD/MM/YYYY') : null}</>
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

    {
      title: t('user.action'),
      dataIndex: '',
      render: (_: any, record: any) => {
        let status = record.status;
        if (dayjs(record.deadPaymentDate).isBefore(dayjs()) && status !== 2) {
          status = 3;
        }
        if (record?.receiver) return null;
        if (ifAnyGranted([RolesEnum.PESONAL_TUTOR])) return null;
        return (
          <Space
            className={css`
              display: flex;
              align-items: center;
              gap: 0.5rem;
              cursor: pointer;
            `}
          >
            {status === 1 && (
              <Button
                $size={SIZE.ExtraSmall}
                onClick={() => setPaymentRow(record)}
              >
                {t('payment.title')}
              </Button>
            )}
            {/* {status === 2 && <Button>{t('pay.active')}</Button>} */}

            {/* {status === 3 && <Button>{t('pay.expired')}</Button>} */}
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        tableInstance={tableInstance}
        totalPage={payment.length}
        columns={columns}
        data={payment}
      />
      <Payment
        data={paymentRow}
        close={() => setPaymentRow(null)}
        refetch={() => {
          // getUser(id);
        }}
      />
    </div>
  );
}
