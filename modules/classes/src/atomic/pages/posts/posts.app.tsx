import {
  BoxCenter,
  Button,
  Card,
  Col,
  EditFilled,
  EditTwoTone,
  EyeTwoTone,
  Row,
  Section,
  SectionLayout,
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
function Posts() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [idPost, setIdPost] = useState(0);

  const { data: dataPosts } = useGetPostsByMeQuery(
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
        <TextSection>{t('manage.postsme')}</TextSection>
      </Section>
      <Section
        className={css`
          margin-top: 2rem;
        `}
      >
        <Row gutter={8}>
          {dataPosts?.map((item: any) => (
            <Col span={8}>
              <Card
                title={
                  <Space
                    className={css`
                      display: flex;
                      justify-content: space-between;
                    `}
                  >
                    <Space>{item?.requestSummaryVI}</Space>
                    <Link to={SiteMap.ClassNew.Details.generate(item.id)}>
                      <EyeTwoTone
                        twoToneColor={COLOR.Primary}
                        title='Details'
                      />
                    </Link>
                  </Space>
                }
                bordered={true}
              >
                <Space>
                  Học Phí: {item.fee}/{DayEnum[item.perTime]}
                </Space>

                <Space>
                  Tuần học {item.dayWeek} buổi ({DataTimeEnum[item.timeDay]}
                  /buổi)
                </Space>

                <Space>
                  Địa Điểm Dạy: {item.address}- {item?.wards?.name}
                </Space>
                <Space>Thời Gian Bắt Đầu:{dayjs(item.timeStart).format('DD-MM-YYYY')}</Space>
                <Space>
                  Lớp:
                  {item.gradeLevels?.map(({ nameEN, nameVI }: any) => (
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
                  {item.subjects?.map(({ nameEN, nameVI }: any) => (
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
                  {item.certifications?.map(({ nameEN, nameVI }: any) => (
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
                  {item.skills?.map(({ nameEN, nameVI }: any) => (
                    <Tag
                      bordered={false}
                      color={colorRandom()}
                    >
                      {getNameLanguage(nameVI, nameEN)}
                    </Tag>
                  ))}
                </Space>
                <Space
                  className={css`
                    margin-top: 2rem;
                    display: flex;
                    gap: 1rem;
                  `}
                >
                  <Button onClick={() => setIdPost(item.id)}>
                    <EyeTwoTone twoToneColor={COLOR.Primary} />
                    Danh Sách Gia Sư Đăng Ký
                  </Button>
                </Space>
              </Card>
            </Col>
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
    </SectionLayout>
  );
}

export default Posts;
