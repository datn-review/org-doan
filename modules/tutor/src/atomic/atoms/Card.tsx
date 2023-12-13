// @flow
import { css, cx } from '@emotion/css';
import { getNameLanguage, useTranslation } from '@org/i18n';
import { BoxCenter, Card, Col, Space, Tag } from '@org/ui';
import { COLOR, SiteMap, colorById, colorByIdUser, getImage } from '@org/utils';
import dayjs from 'dayjs';
import { Else, If, Then } from 'react-if';
import { Link } from 'react-router-dom';

type Props = {};
export const CardTutor = ({ item }: any) => {
  console.log('🚀 ~ file: Card.tsx:33 ~ CardTutor ~ item:', item);
  const { t } = useTranslation();

  return (
    <Col
      span={24}
      md={12}
      lg={12}
      xl={8}
    >
      <Link to={SiteMap.Profile.generate(item?.id)}>
        <Card
          // title={<UserHeaderProfile user={item} />}
          bordered={true}
          className={css`
            line-height: 3rem;
            box-shadow: 0px 01px 7px rgba(0, 0, 0, 0.2);
            .ant-card-head {
              padding: 0 16px;
            }
            .ant-card-body {
              min-height: 220px;
              padding: 0;
              /* overflow: scroll; */
            }
          `}
        >
          <Space
            className={css`
              position: relative;
              cursor: pointer;
              &:hover {
                .bio {
                  display: block;
                }
              }
            `}
          >
            <If condition={!!item?.photo?.path}>
              <Then>
                <img
                  className={css`
                    /* object-fit: cover; */
                    /* height: ; */
                    width: 100%;
                    /* height: 100vw; */
                    /* border-radius: 50%; */
                    /* border: 1px solid ${COLOR.Primary}; */
                    border-radius: 8px;
                    cursor: pointer;
                  `}
                  src={getImage(item?.photo?.path)}
                  alt={item?.photo?.path}
                />
              </Then>
              <Else>
                <BoxCenter
                  className={css`
                    object-fit: cover;
                    height: 4rem;
                    width: 4rem;
                    border-radius: 50%;
                    border: 1px solid ${COLOR.Primary};
                    padding: 0.1rem;
                    background: ${colorByIdUser(item?.id || 1)};
                    color: white;
                  `}
                >
                  {item?.firstName?.substring(0, 1) || ''}
                </BoxCenter>
              </Else>
            </If>
            <Space
              className={cx(
                'bio',
                css`
                  position: absolute;
                  display: none;
                  transition: all 0.5;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  padding: 1rem;
                  font-weight: 600;
                  font-style: italic;
                  background-color: #ffffffc7;
                `,
              )}
            >
              <span>{item?.bio}</span>
            </Space>
          </Space>
          <Space
            className={css`
              padding: 16px;
            `}
          >
            <Space>
              {/* <b>{t('user.name')}: </b> */}
              <b>
                {item?.lastName} {item?.firstName}
              </b>
            </Space>
            <Space>
              <b>{t('tutor.dateofbirth')}: </b>
              <span>{item.birthday && dayjs(item.birthday).format('DD-MM-YYYY')}</span>
            </Space>
            <Space>
              <b>{t('address')}: </b>
              <span>Phú Ninh-Quảng Nam</span>
            </Space>
            <Space>
              <b>{t('classNew.certification')}: </b>
              <TagsList
                data={item?.tutorCertifications}
                isReverse
                bordered
                name='certification'
              />
            </Space>
            <Space>
              <b>{t('classNew.skill')}: </b>
              <TagsList
                data={item?.tutorSkills}
                bordered
                name='skill'
              />
            </Space>

            <Space>
              <b>{t('tutor.quatity.class')}: </b>
              <span>10</span>
            </Space>
            <Space>
              <b>{t('tutor.rating')}: </b>
              <span>10</span>
            </Space>
            <Space
              className={css`
                position: absolute;
                left: 24px;
                bottom: 24px;
                margin-top: 2rem;
                display: flex;
                gap: 1rem;
                button {
                  padding: 9px !important;
                }
                width: calc(100% - 48px);

                flex-wrap: wrap;
              `}
            >
              {/* <Link
            to={SiteMap.ClassNew.Details.generate(item.id)}
            className={css`
              flex: 1;
            `}
          >
            <Button
              $variant={VARIANT.Outlined}
              $size={SIZE.ExtraSmall}
              className={css`
                width: 100%;
              `}
            >
              <EyeTwoTone twoToneColor={COLOR.Primary} />
              {t('details')}
            </Button>
          </Link> */}
            </Space>
          </Space>
        </Card>
      </Link>
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
    <>
      {data?.map((item: any) => (
        <Tag
          bordered={bordered}
          color={colorById(item[name].id, isReverse)}
        >
          {getNameLanguage(item[name].nameVI, item[name].nameEN)}
        </Tag>
      ))}
    </>
  );
};
