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
import React, { useEffect } from 'react';
import { getNameLanguage, useTranslation } from '@org/i18n';
import { setActiveGroup, useAppDispatch, useGetPostsActiveQuery } from '@org/store';
import { COLOR, DataTimeEnum, DayEnum, SiteMap, colorRandom } from '@org/utils';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { css } from '@emotion/css';

function ClassNew() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { data: dataPosts } = useGetPostsActiveQuery(
    {
      sortBy: 'createdAt',
      sortDirection: 'asc',
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.ClassNew.menu }));
    return () => {
      dispatch(setActiveGroup({ current: '' }));
    };
  }, []);
  return (
    <SectionLayout>
      <Section>
        <TextSection>{t('class.new')}</TextSection>
      </Section>

      <Row gutter={8}>
        <Col span={18}>
          <Space>Filter</Space>
          <Row gutter={4}>
            {dataPosts?.map((item: any) => (
              <Col span={12}>
                <Card
                  title={item?.requestSummaryVI}
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
                    <Link to={SiteMap.ClassNew.Details.generate(item.id)}>
                      <Button $variant={VARIANT.Outlined}>
                        <EyeTwoTone twoToneColor={COLOR.Primary} />
                        Chi tiết
                      </Button>
                    </Link>
                    <Button>
                      <EditFilled />
                      Đăng Kí Nhận Lớp
                    </Button>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={6}>
          <Row>Right</Row>
        </Col>
      </Row>
    </SectionLayout>
  );
}

export default ClassNew;
