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
    SectionLayout, SIZE,
    Space,
    Tag,
    TextSection,
    VARIANT,
} from '@org/ui';
import React, {useEffect, useState} from 'react';
import {getNameLanguage, useTranslation} from '@org/i18n';
import {
    setActiveGroup,
    setActiveSubGroup,
    useAppDispatch,
    useCreateRegistrationMutation,
    useGetPostsActiveQuery,
    useGetPostsByMeQuery,
} from '@org/store';
import {COLOR, DataTimeEnum, DayEnum, SiteMap, colorRandom} from '@org/utils';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import {css} from '@emotion/css';
import {RegistrationPost} from '../../molecules';
import {isEmpty} from "lodash";
import {TagsList} from "@org/core";

function Posts() {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const [idPost, setIdPost] = useState(0);

    const {data: dataPosts} = useGetPostsByMeQuery(
        {},
        {
            refetchOnMountOrArgChange: true,
        },
    );
    const [createRegistration] = useCreateRegistrationMutation();

    useEffect(() => {
        dispatch(setActiveGroup({current: SiteMap.Manage.menu}));
        dispatch(setActiveSubGroup({current: SiteMap.Manage.PostsMe.menu}));

        return () => {
            dispatch(setActiveGroup({current: ''}));
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
                <br/>
                <br/>


                {isEmpty(dataPosts) && <BoxCenter>{t("no.data")}</BoxCenter>}
                <Row gutter={8}>
                    {dataPosts?.map((item: any) => (
                        <Col span={24}
                             md={12}
                             lg={6}>
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
                                    <b>{t('classNew.fee')}: </b>
                                    {item?.fee}/{DayEnum[item?.perTime]}
                                </Space>

                                <Space>
                                    <b>{t('classNew.dayWeek')}: </b>
                                    {item.dayWeek} {t('classNew.day')} ({DataTimeEnum[item.timeDay]}/{t('classNew.day')})
                                </Space>

                                <Space>
                                    <b>{t('classNew.address')}: </b>
                                    {item.address}- {item?.wards?.name}
                                </Space>
                                <Space>
                                    <b>{t('classNew.timeStart')}: </b>
                                    {dayjs(item.timeStart).format('DD-MM-YYYY')}
                                </Space>
                                <Space>
                                    <b>{t('classNew.grade')}: </b>
                                    <TagsList
                                        data={item?.gradeLevels}
                                        isReverse
                                    />
                                </Space>
                                <Space>
                                    <b>{t('classNew.subject')}: </b>
                                    <TagsList data={item?.subjects}/>
                                </Space>
                                <Space>
                                    <b>{t('classNew.certification')}: </b>
                                    <TagsList
                                        data={item?.certifications}
                                        isReverse
                                    />
                                </Space>
                                <Space>
                                    <b>{t('classNew.skill')}: </b>
                                    <TagsList data={item?.skills}/>
                                </Space>


                                <Space
                                    className={css`
                                      margin-top: 2rem;
                                      display: flex;
                                      gap: 1rem;
                                    `}
                                >
                                    <Button onClick={() => setIdPost(item.id)}>
                                        {/*<EyeTwoTone twoToneColor={COLOR.Primary}/>*/}
                                        {t('list.tutor.register.post')}
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
