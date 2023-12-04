import { css } from '@emotion/css';
import { useTranslation } from '@org/i18n';
import {
  setActiveGroup,
  useAppDispatch,
  useCreateCollaborationMutation,
  useLazyFindPostsQuery,
} from '@org/store';
import {
  BoxBetween,
  BoxCenter,
  Button,
  Col,
  EditFilled,
  EyeTwoTone,
  Row,
  SIZE,
  Space,
  Spin,
  TextSection,
  TimeAvailability,
  TimeAvailabilityForm,
  timeAvailabilityFormat,
  UserHeaderProfile,
  VARIANT,
} from '@org/ui';
import { COLOR, DataTimeEnum, DayEnum, SiteMap } from '@org/utils';
import * as React from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TagsList } from '@org/core';
import dayjs from 'dayjs';
import { Editor } from '@org/editor';

function ClassNewDetails() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { id } = useParams();

  const [findPosts, { data: postData, isLoading }] = useLazyFindPostsQuery({});
  console.log('🚀 ~ file: class-new-details.app.tsx:53 ~ ClassNewDetails ~ postData:', postData);

  const [createCollaboration] = useCreateCollaborationMutation();

  useEffect(() => {
    findPosts({ id });
  }, [id]);

  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.ClassNew.menu }));
    return () => {
      dispatch(setActiveGroup({ current: '' }));
    };
  }, []);

  const registerForClass = (posts: number, user: number) => () => {
    createCollaboration({
      posts,
      user,
    });
  };
  return (
    <Space className={'section-layout'}>
      <Spin spinning={isLoading}>
        <Space className={'class-new-details section '}>
          <BoxBetween>
            <UserHeaderProfile user={postData?.user} />
            <Space
              className={css`
                display: flex;
                gap: 0.5rem;
              `}
            >
              {/*<Link to={SiteMap.Profile.generate(postData?.user?.id)}>*/}
              {/*  <Button*/}
              {/*    onClick={registerForClass(postData?.id, postData?.user?.id)}*/}
              {/*    $size={SIZE.ExtraSmall}*/}
              {/*  >*/}
              {/*    {t('classNew.student')}*/}
              {/*  </Button>*/}
              {/*</Link>*/}

              <Button
                onClick={registerForClass(postData?.id, postData?.user?.id)}
                $size={SIZE.ExtraSmall}
              >
                <EditFilled />
                {t('classNew.register')}
              </Button>
            </Space>
          </BoxBetween>
          <br />

          <h3>{postData?.requestSummaryVI}</h3>
          <br />
          <Editor
            defaultValue={postData?.requestDetailVI}
            isShow={true}
          />
          <h4
            className={css`
              color: ${COLOR.Primary};
              margin-bottom: 1rem;
            `}
          >
            {t('description.request.tutor')}
          </h4>
          <Row gutter={[10, 10]}>
            <Col
              span={24}
              md={12}
              lg={8}
            >
              <Space
                className={css`
                  font-size: 1.5rem;
                `}
              >
                <b>{t('classNew.fee')}: </b>
                {postData?.fee}/{DayEnum[postData?.perTime]}
              </Space>
            </Col>
            <Col
              span={24}
              md={12}
              lg={8}
            >
              <Space
                className={css`
                  font-size: 1.5rem;
                `}
              >
                <b>{t('classNew.dayWeek')}: </b>
                {postData?.dayWeek} {t('classNew.day')} ({DataTimeEnum[postData?.timeDay]}/
                {t('classNew.day')})
              </Space>
            </Col>
            <Col
              span={24}
              md={12}
              lg={8}
            >
              <Space
                className={css`
                  font-size: 1.5rem;
                `}
              >
                <b>{t('classNew.timeStart')}: </b>
                {dayjs(postData?.timeStart).format('DD-MM-YYYY')}
              </Space>
            </Col>

            <Col
              span={24}
              md={12}
              lg={8}
            >
              <Space
                className={css`
                  font-size: 1.5rem;
                `}
              >
                <b>{t('classNew.address')}: </b>
                {postData?.address}- {postData?.wards?.name}
              </Space>
            </Col>
            <Col
              span={24}
              md={12}
              lg={8}
              className={css`
                font-size: 1.5rem;
              `}
            >
              <Space>
                <b>{t('classNew.grade')}: </b>
                <TagsList
                  data={postData?.gradeLevels}
                  isReverse
                />
              </Space>
            </Col>
            <Col
              span={24}
              md={12}
              lg={8}
              className={css`
                font-size: 1.5rem;
              `}
            >
              <Space>
                <b>{t('classNew.subject')}: </b>
                <TagsList data={postData?.subjects} />
              </Space>
            </Col>
          </Row>
          <h4
            className={css`
              color: ${COLOR.Primary};
              margin-bottom: 1rem;
              margin-top: 2rem;
            `}
          >
            {t('request.tutor')}
          </h4>
          <Row gutter={[10, 10]}>
            <Col
              span={24}
              md={12}
              lg={8}
              className={css`
                font-size: 1.5rem;
              `}
            >
              <Space>
                <b>{t('classNew.skill')}: </b>
                <TagsList data={postData?.skills} />
              </Space>
            </Col>
            <Col
              span={24}
              md={12}
              lg={8}
              className={css`
                font-size: 1.5rem;
              `}
            >
              <Space>
                <b>{t('classNew.certification')}: </b>
                <TagsList
                  data={postData?.certifications}
                  isReverse
                />
              </Space>
            </Col>
          </Row>
          <h4
            className={css`
              color: ${COLOR.Primary};
              margin-bottom: 1rem;
              margin-top: 2rem;
            `}
          >
            {t('timeAvailability')}
          </h4>
          <Col
            span={24}
            className={css`
              font-size: 1.5rem;
            `}
          >
            <TimeAvailability
              value={timeAvailabilityFormat(postData?.postTimeAvailability)}
              name='timeAvailability'
            />
          </Col>
        </Space>
      </Spin>
    </Space>
  );
}

export default ClassNewDetails;
