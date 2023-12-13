import { css } from '@emotion/css';
import { useTranslation } from '@org/i18n';
import {
  setActiveGroup,
  useAppDispatch,
  useAppSelector,
  useGetUserTutorActiveQuery,
  useGetUserTutorQuery,
} from '@org/store';
import {
  Button,
  Col,
  FormProvider,
  Input,
  ModalAntd,
  Row,
  SIZE,
  Section,
  SectionLayout,
  Space,
  TextSection,
  useForm,
} from '@org/ui';
import { SiteMap } from '@org/utils';
import { useEffect, useState } from 'react';
import { If, Then } from 'react-if';
import { useNavigate, useParams } from 'react-router-dom';
import { CardTutor } from './atomic/atoms/Card';
import { SelectCertification, SelectGrade, SelectSkill, SelectSubject } from '@org/core';

function TutorApp() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  const [isShowFilter, setIsShowFilter] = useState(false);
  const methods = useForm<any>({
    defaultValues: {},
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useGetUserTutorActiveQuery({}, { refetchOnMountOrArgChange: true });
  console.log('🚀 ~ file: tutor.app.tsx:14 ~ TutorApp ~ data:', data);
  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.Tutor.menu }));
    return () => {
      dispatch(setActiveGroup({ current: '' }));
    };
  }, []);
  return (
    <SectionLayout>
      <Section
        className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        `}
      >
        <TextSection left>{t('tutor')}</TextSection>
        <Button
          $size={SIZE.ExtraSmall}
          onClick={() => setIsShowFilter(true)}
        >
          {t('filter')}
        </Button>
      </Section>

      <Row gutter={[4, 20]}>
        <Col
          span={24}
          md={18}
        >
          <Row gutter={20}>
            {data?.data?.map((item: any) => (
              <CardTutor
                item={item}
                // registerForClass={registerForClass}
              />
            ))}
          </Row>
        </Col>
        <Col
          span={24}
          md={6}
        >
          <Space>{t('classNew.tutorNeedKnow')}</Space>
          <Space>{t('Quy trình nhận lớp')}</Space>
          <Space>{t('Hợp đồng mẫu')}</Space>
        </Col>
      </Row>
      {isShowFilter && (
        <ModalAntd
          title={
            <Space
              className={css`
                width: 80%;
                display: flex;
                align-items: center;
                input {
                  border: unset !important;
                  margin: 0;
                  //text-align: center !important;
                }
              `}
            >
              <Space>Filter</Space>
              <Input
                name={'search'}
                autoFocus={true}
              />
            </Space>
          }
          open={isShowFilter}
          onCancel={() => setIsShowFilter(false)}
          width={'700px'}
          footer={<Button $size={SIZE.ExtraSmall}>{t('search')}</Button>}
          // zIndex={999999}
        >
          <FormProvider {...methods}>
            <Row gutter={10}>
              <Col span={6}>
                <SelectGrade />
              </Col>
              <Col span={6}>
                <SelectSkill />
              </Col>
              <Col span={6}>
                <SelectCertification />
              </Col>
              <Col span={6}>
                <SelectSubject />
              </Col>
            </Row>
          </FormProvider>
        </ModalAntd>
      )}
    </SectionLayout>
  );
}

export default TutorApp;
