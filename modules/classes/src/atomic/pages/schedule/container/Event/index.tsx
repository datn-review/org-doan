// @flow
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  BoxCenter,
  Button,
  Col,
  EllipsisOutlined,
  ModalAntd,
  Row,
  SIZE,
  Space,
  TableAntd,
  Tabs,
  TabsProps,
  Dropdown,
  Tag,
} from '@org/ui';
import {
  useDeleteAssignmentMutation,
  useLazyFindLessonQuery,
  useUpdateLessonMutation,
} from '@org/store';
import { useTranslation } from '@org/i18n';
import { Editor } from '@org/editor';
import dayjs from 'dayjs';
import { css } from '@emotion/css';
import {
  EnumStatusAssignment,
  EnumStatusAssignmentColor,
  EnumStatusCollap,
  RolesEnum,
  SiteMap,
  TypeRolesEnum,
} from '@org/utils';
import { Link } from 'react-router-dom';
import { Authorization } from '@org/auth';
import { If, Then } from 'react-if';
import { useMessageHook } from '@org/core';
import { ViewExercise } from '../../../../molecules';
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
      title={t('lesson.details')}
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

export const LessonAssigenment = ({ data, isCollap }: any) => {
  const [exerciseID, setExerciseID] = useState<any>(null);
  const { t } = useTranslation();
  const [deleteUser] = useDeleteAssignmentMutation();
  const { messageSuccess, messageError, contextHolder } = useMessageHook();

  const getStatus = (record: any) => {
    let status = EnumStatusAssignment.Active;
    if (dayjs(record.endTime).isBefore(dayjs())) {
      status = EnumStatusAssignment.Expired;
    }
    if (dayjs(record.startTime).isAfter(dayjs())) {
      status = EnumStatusAssignment.Pending;
    }
    if (record?.status === EnumStatusAssignment.Complete) {
      status = EnumStatusAssignment.Complete;
    }
    return status;
  };
  const getStatusName = (record: any) => {
    let status = getStatus(record);

    switch (status) {
      case EnumStatusAssignment.Active:
        return t('assignment.active');
      case EnumStatusAssignment.Pending:
        return t('assignment.pending');
      case EnumStatusAssignment.Expired:
        return t('expired');
      case EnumStatusAssignment.Complete:
        return t('complete');
    }
  };
  const getStatusColor = (record: any) => {
    let status = getStatus(record);
    return EnumStatusAssignmentColor?.[status] || 'error';
  };
  const columns: any[] = [
    {
      key: 'title ',
      title: t('assignment.name'),
      dataIndex: 'title',
      sorter: true,
    },

    {
      key: 'startTime',
      title: t('timeStart'),
      dataIndex: 'startTime',
      sorter: true,

      render: (startTime: string) => <>{dayjs(startTime).format('DD/MM/YYYY HH:mm')}</>,
    },
    {
      key: 'endTime',
      title: t('timeEnd'),
      dataIndex: 'endTime',
      sorter: true,

      render: (endTime: string) => <>{dayjs(endTime).format('DD/MM/YYYY HH:mm')}</>,
    },

    {
      title: t('user.status'),
      sorter: true,

      dataIndex: 'status',
      key: 'status',
      render: (_: any, record: any) => (
        <Tag color={getStatusColor(record)}>{getStatusName(record)}</Tag>
      ),
    },

    {
      title: t('user.action'),
      dataIndex: '',
      align: 'center',
      render: (_: any, record: any) => {
        const status = getStatus(record);
        return (
          <BoxCenter>
            <Authorization
              type={TypeRolesEnum.IF_ANY_GRANTED}
              roles={[RolesEnum.PESONAL_TUTOR]}
            >
              <Dropdown
                className={css`
                  cursor: pointer;

                  * {
                    font-size: 14px;
                  }
                `}
                overlayClassName={css`
                  width: 20rem;
                `}
                menu={{
                  items: [
                    {
                      key: '1',
                      label: (
                        <Space
                          onClick={() => setExerciseID(record?.exercise?.id)}
                          className={css`
                            color: #5c5b68 !important;
                          `}
                        >
                          {t('exercise.details')}
                        </Space>
                      ),
                      isShow: true,
                    },
                    {
                      key: '2',
                      label: (
                        <Space>
                          <Link
                            to={SiteMap.Assessment.Assignment.Edit.generate(record?.id, '10')}
                            className={css`
                              color: #5c5b68 !important;
                            `}
                          >
                            {t('edit')}
                          </Link>
                        </Space>
                      ),
                      isShow: status === EnumStatusAssignment.Pending,
                    },
                    {
                      key: '3',
                      label: (
                        <Space
                          onClick={() =>
                            deleteUser(record.id)
                              .then((data) => {
                                messageSuccess(t('user.delete.success'));
                              })
                              .catch((error) => {
                                messageError(t('user.delete.error'));
                              })
                              .finally(() => {
                                // setIsFetch(true);
                              })
                          }
                        >
                          {t('remove')}
                        </Space>
                      ),
                      isShow: status === EnumStatusAssignment.Pending,
                    },
                    {
                      key: '4',
                      label: (
                        <Link
                          to={SiteMap.Assessment.Assignment.Review.generate(record.id)}
                          className={css`
                            color: #5c5b68 !important;
                          `}
                        >
                          {t('result')}
                        </Link>
                      ),
                      isShow: status === EnumStatusAssignment.Complete,
                    },
                  ].filter(({ isShow }) => isShow) as any[],
                }}
                trigger={['click']}
                placement='bottomLeft'
                // arrow={{ pointAtCenter: true }}
              >
                <EllipsisOutlined
                  className={css`
                    transform: scale(1.6);
                    display: flex;
                    justify-content: center;
                  `}
                />
              </Dropdown>
            </Authorization>

            <Authorization
              type={TypeRolesEnum.IF_ANY_GRANTED}
              roles={[RolesEnum.STUDENT, RolesEnum.PARENT]}
            >
              {status === EnumStatusAssignment.Complete && (
                <Link to={SiteMap.Assessment.Assignment.Review.generate(record.id)}>
                  <Button $size={SIZE.ExtraSmall}>{t('result')}</Button>
                </Link>
              )}
              {status === EnumStatusAssignment.Expired && (
                <Button $size={SIZE.ExtraSmall}>{t('expired')}</Button>
              )}
              {status === EnumStatusAssignment.Active && (
                <Link to={SiteMap.Assessment.Assignment.Do.generate(record.id)}>
                  <Button $size={SIZE.ExtraSmall}>{t('do')}</Button>
                </Link>
              )}
            </Authorization>
          </BoxCenter>
        );
      },
    },
  ];

  return (
    <Space>
      {contextHolder}
      <Space
        className={css`
          display: flex;
          justify-content: flex-end;
          margin: 0 0 2rem 0;
        `}
      >
        {!isCollap && (
          <Link to={SiteMap.Assessment.Assignment.Create.generate(data?.id)}>
            <Button $size={SIZE.ExtraSmall}>{t('assignment.create')}</Button>
          </Link>
        )}
      </Space>
      <TableAntd
        columns={columns}
        dataSource={isCollap ? data : data?.assignments || []}
      />
      {exerciseID && (
        <ViewExercise
          id={exerciseID}
          close={() => setExerciseID(null)}
        />
      )}
    </Space>
  );
};
