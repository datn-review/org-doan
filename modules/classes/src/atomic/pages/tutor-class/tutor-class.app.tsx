import { css } from '@emotion/css';
import { getNameLanguage } from '@org/i18n';
import {
  Button,
  Card,
  Col,
  EditFilled,
  EyeTwoTone,
  Row,
  SectionLayout,
  Space,
  Tag,
  TextSection,
  VARIANT,
} from '@org/ui';
import { COLOR, DataTimeEnum, DayEnum, SiteMap, colorRandom } from '@org/utils';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

function TutorClass() {
  const dataPosts: any[] = [];
  return (
    <SectionLayout>
      <TextSection>Manage Class</TextSection>
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
      </Row>
    </SectionLayout>
  );
}

export default TutorClass;
