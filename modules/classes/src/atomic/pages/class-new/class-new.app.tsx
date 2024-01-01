import { css } from '@emotion/css';
import {
  SelectCertification,
  SelectGrade,
  SelectSkill,
  SelectSubject,
  useMessageHook,
  useMount,
} from '@org/core';
import { useTranslation } from '@org/i18n';
import {
  setActiveGroup,
  useAppDispatch,
  useAppSelector,
  useCreateCollaborationMutation,
  useLazyGetPostsActiveAuthQuery,
  useLazyGetPostsActiveQuery,
} from '@org/store';
import {
  BoxBetween,
  BoxCenter,
  Button,
  Col,
  FileSearchOutlined,
  FormProvider,
  ModalAntd,
  NoDataSvg,
  Pagination,
  Row,
  SectionLayout,
  SelectForm,
  SIZE,
  Skeleton,
  Space,
  Spin,
  TextSection,
  useForm,
  VARIANT,
} from '@org/ui';
import { COLOR, SiteMap } from '@org/utils';
import { useEffect, useState } from 'react';
import banner1 from '../../../assets/0.png';
import banner2 from '../../../assets/3.png';
import { CardClassNew } from '../../atoms/Card';
import { Else, If, Then } from 'react-if';
import { isEmpty } from 'lodash';

const dataInit: any = {
  gradeLevel: undefined,
  subject: undefined,
  skills: undefined,
  certification: undefined,
  status: 0,
};
function ClassNew() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [isShowFilter, setIsShowFilter] = useState(false);

  const { contextHolder, messageSuccess, messageError } = useMessageHook();

  const [currentPage, setCurrentPage] = useState(1);

  const methods = useForm<any>({
    defaultValues: dataInit,
  });
  const [getData, { data: dataPosts, isFetching, isSuccess }] = isAuthenticated
    ? useLazyGetPostsActiveAuthQuery()
    : useLazyGetPostsActiveQuery();
  const limit = 12;
  useMount(() => {
    getData({
      sortBy: 'createdAt',
      sortDirection: 'desc',
      limit,
      page: currentPage,
    });
  });

  const [createCollaboration] = useCreateCollaborationMutation();

  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.ClassNew.menu }));
    return () => {
      dispatch(setActiveGroup({ current: '' }));
    };
  }, []);
  const registerForClass = (posts: number, user: number) => {
    createCollaboration({
      posts,
      user,
    })
      .then(() => {
        messageSuccess(t('post.class.success'));
      })
      .catch(() => {
        messageError(t('post.class.error'));
      });
  };
  const close = () => setIsShowFilter(false);
  const submit = (value: any) => {
    getData({
      sortBy: 'createdAt',
      sortDirection: 'asc',
      limit,
      page: 1,
      grade: value.gradeLevel,
      skills: value.skills,
      subject: value.subject,
      certification: value.certification,
      status: value.status,
    });
    setIsShowFilter(false);
    setCurrentPage(1);
  };
  const clear = () => {
    methods.setValue('gradeLevel', undefined);
    methods.setValue('skills', undefined);
    methods.setValue('subject', undefined);
    methods.setValue('subject', undefined);
    methods.setValue('status', 0);

    getData({
      sortBy: 'createdAt',
      sortDirection: 'asc',
      limit: 10,
      page: 1,
    });
    setIsShowFilter(false);
    setCurrentPage(1);
  };

  return (
    <SectionLayout>
      {contextHolder}
      <BoxBetween
        className={css`
          position: relative;
          /* margin-bottom: 2rem; */
          padding: 0 1rem;
        `}
      >
        <TextSection
          className={css`
            /* position: absolute; */
            /* top: 50%; */
            /* left: 50%; */
            /* transform: translate(-50%, -25%); */
          `}
          color={COLOR.Secondary}
          secondary
          left
        >
          {t('class.new')}
        </TextSection>
        <Button onClick={() => setIsShowFilter(true)}>
          <FileSearchOutlined />
          {t('search.title')}
        </Button>
      </BoxBetween>

      <Row gutter={[10, 20]}>
        <Col
          span={24}
          md={19}
        >
          <Skeleton loading={isFetching || !isSuccess}>
            <Row gutter={[10, 10]}>
              <If condition={!isEmpty(dataPosts?.data)}>
                <Then>
                  {dataPosts?.data?.map((item: any) => (
                    <CardClassNew
                      item={item}
                      registerForClass={registerForClass}
                    />
                  ))}
                </Then>
                <Else>
                  <BoxCenter
                    className={css`
                      width: 100%;
                    `}
                  >
                    <NoDataSvg />
                  </BoxCenter>
                </Else>
              </If>
            </Row>
            <If condition={!isEmpty(dataPosts?.data)}>
              <Then>
                <br></br>
                <BoxBetween>
                  <Space></Space>
                  <Pagination
                    defaultCurrent={currentPage}
                    current={currentPage}
                    defaultPageSize={limit}
                    pageSize={limit}
                    onChange={(value) => {
                      getData({
                        sortBy: 'createdAt',
                        sortDirection: 'asc',
                        limit,
                        page: value,
                        grade: methods.watch('gradeLevel'),
                        skills: methods.watch('skills'),
                        subject: methods.watch('subject'),
                        certification: methods.watch('certification'),
                      });
                      setCurrentPage(value);
                    }}
                    simple
                    total={dataPosts?.totals}
                  />
                </BoxBetween>
              </Then>
            </If>
          </Skeleton>
        </Col>
        <Col
          span={24}
          md={5}
        >
          <img
            src={banner2}
            className={css`
              border-radius: 10px;
            `}
          />
          <br />
          <img
            src={banner1}
            className={css`
              border-radius: 10px;
            `}
          />
        </Col>
      </Row>

      <ModalAntd
        title={
          <Space
            className={css`
              width: 80%;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              input {
                border: unset !important;
                margin: 0;
                //text-align: center !important;
              }
            `}
          >
            <Space
              className={css`
                width: 10rem;
              `}
            >
              {t('search.title')}
            </Space>
            {/* <Input
                name={'search'}
                autoFocus={true}
                placeholder={'please input name'}
              /> */}
          </Space>
        }
        open={isShowFilter}
        onCancel={close}
        width={'700px'}
        footer={
          <Space
            className={css`
              display: flex;
              justify-content: flex-end;
              gap: 1rem;
            `}
          >
            <Button
              // $size={SIZE.ExtraSmall}
              $variant={VARIANT.Outlined}
              onClick={methods.handleSubmit(clear)}
            >
              {t('clear')}
            </Button>
            <Button
              // $size={SIZE.ExtraSmall}
              onClick={methods.handleSubmit(submit)}
            >
              {t('search')}
            </Button>
          </Space>
        }
        // zIndex={999999}
      >
        <FormProvider {...methods}>
          <Row gutter={10}>
            <Col span={12}>
              <SelectGrade isDefault />
            </Col>
            <Col span={12}>
              <SelectSkill
                single
                isDefault
              />
            </Col>
            <Col span={8}>
              <SelectCertification
                single
                isDefault
              />
            </Col>
            <Col span={8}>
              <SelectSubject isDefault />
            </Col>
            <Col span={8}>
              <SelectForm
                name='status'
                options={[
                  {
                    value: 0,
                    label: t('status.post.all'),
                  },
                  {
                    value: 1,
                    label: t('status.post.no.collap'),
                  },
                  { value: 2, label: t('status.post.collap') },
                ]}
                label={t('user.status')}
              />
            </Col>
          </Row>
        </FormProvider>
      </ModalAntd>
    </SectionLayout>
  );
}

export default ClassNew;
