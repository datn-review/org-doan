import {
  Button,
  Col,
  FormProvider,
  Input,
  ModalAntd,
  Row,
  Section,
  SectionLayout,
  SIZE,
  Space,
  TextSection,
  useForm,
} from '@org/ui';
import React, { useEffect, useState } from 'react';
import { useTranslation } from '@org/i18n';
import {
  setActiveGroup,
  useAppDispatch,
  useCreateCollaborationMutation,
  useGetPostsActiveQuery,
} from '@org/store';
import { SiteMap } from '@org/utils';
import { CardClassNew } from '../../atoms/Card';
import { css } from '@emotion/css';
import { SelectCertification, SelectGrade, SelectSkill, SelectSubject } from '@org/core';

const dataInit: any = {
  grade: undefined,
  subject: undefined,
  tutorName: undefined,
  skills: undefined,
};
function ClassNew() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isShowFilter, setIsShowFilter] = useState(false);
  const methods = useForm<any>({
    defaultValues: dataInit,
  });
  const { data: dataPosts } = useGetPostsActiveQuery(
    {
      sortBy: 'createdAt',
      sortDirection: 'asc',
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const [createCollaboration] = useCreateCollaborationMutation();

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
  const close = () => setIsShowFilter(false);

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
        <TextSection>{t('class.new')}</TextSection>
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
          <Row gutter={4}>
            {dataPosts?.map((item: any) => (
              <CardClassNew
                item={item}
                registerForClass={registerForClass}
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
          onCancel={close}
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

export default ClassNew;
