import {
  BoxCenter,
  Button,
  Card,
  Col,
  EditFilled,
  EditTwoTone,
  EyeTwoTone,
  ModalAntd,
  Row,
  Section,
  SectionLayout,
  SIZE,
  Space,
  Tag,
  TextSection,
  VARIANT,
} from '@org/ui';
import React, { useEffect, useState } from 'react';
import { getNameLanguage, useTranslation } from '@org/i18n';
import {
  setActiveGroup,
  setActiveSubGroup,
  useAppDispatch,
  useCreateRegistrationMutation,
  useGetPostsActiveQuery,
  useGetPostsByMeQuery,
} from '@org/store';
import { COLOR, DataTimeEnum, DayEnum, SiteMap, colorRandom } from '@org/utils';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { css } from '@emotion/css';
import { RegistrationPost } from '../../molecules';
import { isEmpty } from 'lodash';
import { TagsList } from '@org/core';
import { CardPost } from './../../atoms/CardPost';
import LookForTutorEditApp from './../../molecules/post/look-for-tutor-edit.app';

function Posts() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [idPost, setIdPost] = useState(0);
  const [idPostEdit, setIdPostEdit] = useState(0);

  const { data: dataPosts, refetch } = useGetPostsByMeQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const [createRegistration] = useCreateRegistrationMutation();

  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.Manage.menu }));
    dispatch(setActiveSubGroup({ current: SiteMap.Manage.PostsMe.menu }));

    return () => {
      dispatch(setActiveGroup({ current: '' }));
    };
  }, []);
  const registerForClass = (postsId: number) => () => {
    createRegistration({
      postsId,
    });
  };
  return (
    <SectionLayout>
      <Section>
        <h2>{t('manage.postsme')}</h2>
        <br />
        <br />

        {isEmpty(dataPosts) && <BoxCenter>{t('no.data')}</BoxCenter>}
        <Row gutter={[20, 20]}>
          {dataPosts?.map((item: any) => (
            <CardPost
              item={item}
              handleClick={(type: any, id: any) => {
                if (type === 'edit') {
                  setIdPostEdit(id);
                } else {
                  setIdPost(id);
                }
              }}
            />
          ))}
        </Row>
      </Section>
      {!!idPost && (
        <RegistrationPost
          id={idPost}
          close={() => {
            setIdPost(0);
          }}
        />
      )}
      {!!idPostEdit && (
        <ModalAntd
          // title={t('list.tutor.register')}
          open={!!idPostEdit}
          onCancel={() => {
            setIdPostEdit(0);
          }}
          width={'999px'}
          footer={<></>}
        >
          <LookForTutorEditApp
            id={idPostEdit}
            refetch={() => {
              refetch();
              setIdPostEdit(0);
            }}
          />
        </ModalAntd>
      )}
    </SectionLayout>
  );
}

export default Posts;
