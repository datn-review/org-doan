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
  useLazyFindPostsQuery,
  useLazyGetPostsQuery,
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
  Tag,
  Spin,
} from '@org/ui';
import {
  COLOR,
  DataTimeEnum,
  DayEnum,
  SiteMap,
  colorRandom,
  dataTime,
  day,
  formatData,
} from '@org/utils';
import { useEffect, useMemo, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AddressForm } from '@org/core';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { Editor } from '@org/editor';

function ClassNewDetails() {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  console.log('🚀 ~ file: class-new-details.app.tsx:50 ~ ClassNewDetails ~ id:', id);

  const [findPosts, { data: postData, isLoading }] = useLazyFindPostsQuery({});
  console.log('🚀 ~ file: class-new-details.app.tsx:53 ~ ClassNewDetails ~ isLoading:', isLoading);
  console.log('🚀 ~ file: class-new-details.app.tsx:53 ~ ClassNewDetails ~ postData:', postData);
  useEffect(() => {
    findPosts({ id });
  }, [id]);

  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.ClassNew.menu }));
    return () => {
      dispatch(setActiveGroup({ current: '' }));
    };
  }, []);
  return (
    <Space className={'section-layout'}>
      <Spin spinning={isLoading}>
        <Space className={'class-new-details section'}>
          <Space>{postData?.requestSummaryVI}</Space>
          <Space></Space>
          <Editor
            defaultValue={postData?.requestDetailVI}
            isShow={true}
          />
          <Space>
            Học Phí: {postData?.fee}/{DayEnum[postData?.perTime]}
          </Space>

          <Space>
            Tuần học {postData?.dayWeek} buổi ({DataTimeEnum[postData?.timeDay]}
            /buổi)
          </Space>

          <Space>
            Địa Điểm Dạy: {postData?.address}- {postData?.wards?.name}
          </Space>
          <Space>Thời Gian Bắt Đầu:{dayjs(postData?.timeStart).format('DD-MM-YYYY')}</Space>
          <Space>
            Lớp:
            {postData?.gradeLevels?.map(({ nameEN, nameVI }: any) => (
              <Tag
                bordered={false}
                color={colorRandom()}
              >
                {getNameLanguage(nameVI, nameEN)}
              </Tag>
            ))}
          </Space>
          <Space>
            Môn Học:
            {postData?.subjects?.map(({ nameEN, nameVI }: any) => (
              <Tag
                bordered={false}
                color={colorRandom()}
              >
                {getNameLanguage(nameVI, nameEN)}
              </Tag>
            ))}
          </Space>
          <Space>Yêu Cầu</Space>
          <Space>
            Chứng Chỉ:
            {postData?.certifications?.map(({ nameEN, nameVI }: any) => (
              <Tag
                bordered={false}
                color={colorRandom()}
              >
                {getNameLanguage(nameVI, nameEN)}
              </Tag>
            ))}
          </Space>
          <Space>
            Kỹ Năng:
            {postData?.skills?.map(({ nameEN, nameVI }: any) => (
              <Tag
                bordered={false}
                color={colorRandom()}
              >
                {getNameLanguage(nameVI, nameEN)}
              </Tag>
            ))}
          </Space>
        </Space>
      </Spin>
    </Space>
  );
}

export default ClassNewDetails;
