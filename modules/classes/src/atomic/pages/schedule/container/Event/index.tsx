// @flow
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, Col, ModalAntd, Row, SIZE, Space, Tabs, TabsProps } from '@org/ui';
import { useLazyFindLessonQuery, useUpdateLessonMutation } from '@org/store';
import { useTranslation } from '@org/i18n';
import { Editor } from '@org/editor';
import dayjs from 'dayjs';
import { css } from '@emotion/css';

type Props = {
  close: () => void;
  id: number;
};
export const Event = ({ id, close }: Props) => {
  const [getEvent, { data }] = useLazyFindLessonQuery();
  const { t } = useTranslation();
  useEffect(() => {
    if (id) {
      getEvent({ id });
    }
  }, [id]);
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('lesson.info'),
      children: <LessonInfo data={data} />,
    },
    {
      key: '2',
      label: t('lesson.assignment'),
      children: <LessonAssigenment data={data} />,
    },
    {
      key: '3',
      label: t('lesson.comment'),
      children: 'Content of Tab Pane 3',
    },
  ];

  return (
    <ModalAntd
      title='Chi Tiet Buoi Hoc '
      open={!!id}
      onCancel={close}
      width={'999px'}
      footer={<></>}
      zIndex={999999}
    >
      <Tabs
        defaultActiveKey='1'
        items={items}
      />
      {/*<Table*/}
      {/*    tableInstance={tableInstance}*/}
      {/*    totalPage={data?.totals}*/}
      {/*    columns={columns}*/}
      {/*    data={data}*/}
      {/*    loading={isLoading}*/}
      {/*/>*/}
      {/*<Contants*/}
      {/*    type={EnumTypeContact.PostSignature}*/}
      {/*    data={contants}*/}
      {/*    close={() => setIdContants(null)}*/}
      {/*    refetch={() => {*/}
      {/*        getUser(id);*/}
      {/*    }}*/}
      {/*/>*/}
      {/*<Payment*/}
      {/*    data={payment}*/}
      {/*    close={() => setPayment(null)}*/}
      {/*    refetch={() => {*/}
      {/*        // getUser(id);*/}
      {/*    }}*/}
      {/*/>*/}
      {/*<Space>Bai Tap</Space>*/}
    </ModalAntd>
  );
};
export const LessonInfo = ({ data }: any) => {
  const { t } = useTranslation();
  const [content, setContent] = useState(data?.content);
  const [updateLesson] = useUpdateLessonMutation();
  console.log(content);
  const handleSave = () => {
    updateLesson({ body: { content }, id: data?.id }).then((res) => {
      console.log(res);
    });
  };
  return (
    <Space>
      <Row gutter={[10, 10]}>
        <Col span={12}>
          <Space></Space>
          <Space>
            {t('date')} : {dayjs(data?.lessonStart).format('DD-MM-YYYY')}{' '}
            {dayjs(data?.lessonStart).format('MM:hh')} - {dayjs(data?.lessonEnd).format('MM:hh')}
          </Space>
        </Col>
        <Col span={24}>
          <Space>{t('lesson.content')}</Space>
          <Editor
            defaultValue={data?.content || ''}
            onChange={(value) => setContent(value)}
          />
        </Col>
        <Col span={24}>
          <Space
            className={css`
              display: flex;
              justify-content: flex-end;
            `}
          >
            <Button
              $size={SIZE.ExtraSmall}
              onClick={handleSave}
            >
              {t('update')}
            </Button>
          </Space>
        </Col>
      </Row>
    </Space>
  );
};

export const LessonAssigenment = ({ data }: any) => {
  const { t } = useTranslation();

  return (
    <Space>
      <Space
        className={css`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <Button $size={SIZE.ExtraSmall}>{t('assigment.create')}</Button>
      </Space>
      {/*<Table*/}
      {/*  tableInstance={tableInstance}*/}
      {/*  totalPage={data?.totals}*/}
      {/*  columns={columns}*/}
      {/*  data={data}*/}
      {/*  loading={isLoading}*/}
      {/*/>*/}
    </Space>
  );
};
