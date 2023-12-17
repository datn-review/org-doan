// @flow
import { css, cx } from '@emotion/css';
import { getNameLanguage, useTranslation } from '@org/i18n';
import {
  BookTwoTone,
  BoxCenter,
  Button,
  CalendarTwoTone,
  Card,
  Col,
  EnvironmentTwoTone,
  Rate,
  SIZE,
  SnippetsTwoTone,
  Space,
  Tag,
  WechatFilled,
} from '@org/ui';
import { COLOR, SiteMap, colorById, colorByIdUser, getImage } from '@org/utils';
import dayjs from 'dayjs';
import { Else, If, Then } from 'react-if';
import { Link, useNavigate } from 'react-router-dom';

type Props = {};
export const CardTutor = ({ item }: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Col
      span={24}
      sm={12}
      md={12}
      lg={8}
      xl={6}
    >
      <Card
        bordered={true}
        className={css`
          line-height: 3rem;
          box-shadow: 0px 01px 7px rgba(0, 0, 0, 0.2);

          .ant-card-body {
            min-height: 220px;
            padding: 0;
            padding: 8px;
          }
          overflow: hidden;
          border-radius: 8px;
        `}
      >
        <BoxCenter
          className={css`
            position: relative;
            cursor: pointer;
            flex-direction: column;
            background-color: ${COLOR.Primary};
            border-radius: 18px;
            padding: 10px 0;
            .ant-tag {
              border-color: white !important;
              font-weight: 600;
            }
            b {
              color: white !important;
            }
          `}
        >
          <Link to={SiteMap.Profile.generate(item?.id)}>
            <If condition={!!item?.photo?.path}>
              <Then>
                <img
                  className={css`
                    width: 100%;
                    cursor: pointer;
                    height: 10rem;
                    width: 10rem;
                    object-fit: cover;
                    border-radius: 50%;
                    border: 2px solid white;
                  `}
                  src={getImage(item?.photo?.path)}
                  alt={item?.photo?.path}
                />
              </Then>
              <Else>
                <BoxCenter
                  className={css`
                    width: 100%;
                    cursor: pointer;
                    height: 10rem;
                    width: 10rem;
                    border-radius: 50%;
                    border: 2px solid white;
                    color: white;
                    background: ${colorByIdUser(item?.id || 1)};
                  `}
                >
                  {item?.firstName?.substring(0, 1) || ''}
                </BoxCenter>
              </Else>
            </If>
          </Link>

          <Space>
            {/* <b>{t('user.name')}: </b> */}
            <b>
              {item?.lastName} {item?.firstName}
            </b>
          </Space>
          <Space>
            <TagsList
              data={item?.tutorCertifications}
              isReverse
              bordered
              name='certification'
            />
          </Space>
          <Space>
            <TagsList
              data={item?.tutorSkills}
              bordered
              name='skill'
            />
          </Space>
          <Space>
            <TagsList
              data={item?.tutorGrade}
              bordered
              name='gradeLevel'
            />
          </Space>
        </BoxCenter>
        <BoxCenter
          className={css`
            padding: 16px;
            flex-direction: column;
          `}
        >
          <Space>
            <Rate
              name={'rate'}
              value={item?.star}
              allowHalf
              disabled
            />
          </Space>
          <Space>
            <EnvironmentTwoTone twoToneColor={COLOR.Primary} />{' '}
            {item?.wards?.districts?.province?.name || t('updating')}
          </Space>
          <Space>
            {/* <b>{t('classNew.subject')}: </b> */}
            <BookTwoTone twoToneColor={COLOR.Primary} /> {item?.school || t('updating')}
          </Space>
          <Button
            $size={SIZE.ExtraSmall}
            onClick={() => {
              navigate(SiteMap.Chat.path);
            }}
          >
            <WechatFilled style={{ color: COLOR.White }} />
            <b>{t('chat')} </b>
          </Button>
        </BoxCenter>
      </Card>
    </Col>
  );
};
const TagsList = ({
  data,
  isReverse = false,
  bordered = false,
  name = '',
}: {
  data: any;
  isReverse?: boolean;
  bordered?: boolean;
  name?: string;
}) => {
  return (
    <BoxCenter
      className={css`
        flex-wrap: wrap;
        gap: 0.1rem !important;
      `}
    >
      {data?.map((item: any) => (
        <Tag
          bordered={bordered}
          color={colorById(item[name].id, isReverse)}
        >
          {getNameLanguage(item[name].nameVI, item[name].nameEN)}
        </Tag>
      ))}
    </BoxCenter>
  );
};
