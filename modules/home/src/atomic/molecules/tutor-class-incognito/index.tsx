import { css, cx } from '@emotion/css/macro';
import { Space, BoxCenter, TextSection, Row, Col } from '@org/ui';
import { COLOR, COLOR_RGB } from '@org/utils';
import comment from './image/comment.png';
import personalized from './image/personalized.png';

import result from './image/result.png';
import { i18nContant, useTranslation } from '@org/i18n';

const steps = [
  {
    title: i18nContant('incognito.1'),
    bg: '#FFC6A3',
    text: i18nContant('incognito.1.1'),
    image: personalized,
  },
  {
    title: i18nContant('incognito.2'),
    bg: '#B3E0F5',
    text: i18nContant('incognito.2.2'),
    image: comment,
  },
  {
    title: i18nContant('incognito.3'),
    bg: '#FFDC99',
    text: i18nContant('incognito.3.3'),
    image: result,
  },
];
function TutorClass() {
  const { t } = useTranslation();
  return (
    <Space
      className={css`
        background-color: white;
        padding-bottom: 5rem;
        padding-top: 2rem;
      `}
    >
      <Space className={cx('section-layout')}>
        <BoxCenter>
          <TextSection color={COLOR.Black}>{t('incognito.title')}</TextSection>
        </BoxCenter>
        <Row gutter={[10, 10]}>
          {steps.map(({ bg, title, text, image }) => (
            <Col
              span={24}
              md={8}
              lg={8}
            >
              <Space
                className={css`
                  background-color: ${bg};
                  text-align: center;
                  padding: 2.4rem;
                  border-radius: 0.5rem;
                  height: 100%;
                  & * {
                    color: ${COLOR.Black};
                  }
                `}
              >
                <BoxCenter>
                  <img
                    src={image}
                    alt={'image'}
                    width={50}
                  />
                </BoxCenter>
                <h4
                  className={css`
                    margin: 1rem 0;
                  `}
                >
                  {title}
                </h4>
                <h6>{text}</h6>
              </Space>
            </Col>
          ))}
        </Row>
      </Space>
    </Space>
  );
}

export default TutorClass;
