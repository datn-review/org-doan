import { css, cx } from '@emotion/css/macro';
import { i18nContant, useTranslation } from '@org/i18n';
import { Space, BoxCenter, TextSection, Row, Col } from '@org/ui';
import { COLOR, COLOR_RGB, mediaMiniTablet, mediaPhone } from '@org/utils';
import React from 'react';
const cssStep = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.2rem;
  ${mediaMiniTablet} {
    font-size: 20px !important;
  }
  ${mediaPhone} {
    font-size: 18px !important;
  }
  font-weight: 700;
  color: ${COLOR.White};
  height: 72px;
  position: relative;
  padding-left: 2rem;
  &:after {
    position: absolute;
    content: '';
    height: 52px;
    width: 52px;
    background-color: rgba(0, 0, 0, 0.5);
    right: -27px;
    transform: rotateZ(45deg);
    border-radius: 2px;
    z-index: 1;
  }
`;
const steps = [
  {
    number: 1,
    bg: '#ffba00',
    text: i18nContant('step.1.1'),
  },
  {
    number: 2,
    bg: '#ff6609',
    text: i18nContant('step.1.2'),
  },
  {
    number: 3,
    bg: '#1dc2da',
    text: i18nContant('step.1.3'),
  },
  {
    number: 4,
    bg: '#327ad5',
    text: i18nContant('step.1.4'),
    isLast: true,
  },
];
function StepRegister() {
  const { t } = useTranslation();
  return (
    <Space>
      <Space className={'section-layout'}>
        <BoxCenter>
          <TextSection color={COLOR.Black}>{t('step.title')}</TextSection>
        </BoxCenter>
        <Space
          className={css`
            /* border-top-left-radius: 1rem;
          border-top-right-radius: 1rem; */
            border-radius: 1rem;
            display: flex;
            overflow: hidden;
          `}
        >
          {steps.map(({ bg, number, text, isLast }) => (
            <Space
              className={css`
                flex: 1;
              `}
            >
              <Space
                className={cx(
                  cssStep,
                  css`
                    background-color: ${bg};
                    &:after {
                      background-color: ${bg};
                    }
                  `,
                )}
              >
                <Space
                  className={css`
                    z-index: 2;
                    color: white;
                  `}
                >
                  {t('step')} {number}
                </Space>
              </Space>
              <BoxCenter
                className={css`
                  margin-top: 1.4rem;
                  background-color: ${COLOR.White};
                  padding: 3rem 0;
                  font-weight: 600;
                  font-size: 2rem;
                  ${mediaMiniTablet} {
                    font-size: 16px !important;
                  }
                  ${mediaPhone} {
                    font-size: 12px !important;
                  }
                  border-right: ${isLast
                    ? 'none'
                    : `0.2rem solid rgba(${COLOR_RGB.Secondary}, 0.1)`};
                `}
              >
                {text}
              </BoxCenter>
            </Space>
          ))}
        </Space>
      </Space>
      <Row
        className={css`
          margin: 3rem 0;
          background: ${COLOR.Primary};
          padding: 5rem 5rem;
          & * {
            color: ${COLOR.White};
          }
          ${mediaMiniTablet} {
            h1 {
              font-size: 3rem !important;
            }
            h5 {
              /* font-size: 16px !important; */
            }
          }
          ${mediaPhone} {
            h1 {
              font-size: 2.5rem !important;
            }
          }
        `}
        gutter={[0, 20]}
      >
        <Col
          span={12}
          sm={12}
          lg={6}
          className={css`
            text-align: center;
          `}
        >
          <h1>100.000+</h1>
          <h5>{t('step.1')}</h5>
        </Col>
        <Col
          span={12}
          sm={12}
          lg={6}
          className={css`
            text-align: center;
          `}
        >
          <h1>5.000+</h1>
          <h5>{t('step.2')}</h5>
        </Col>
        <Col
          span={12}
          sm={12}
          lg={6}
          className={css`
            text-align: center;
          `}
        >
          <h1>300.000+</h1>
          <h5>{t('step.3')}</h5>
        </Col>
        <Col
          span={12}
          sm={12}
          lg={6}
          className={css`
            text-align: center;
          `}
        >
          <h1>3.000+</h1>
          <h5>{t('step.4')}</h5>
        </Col>
      </Row>
    </Space>
  );
}

export default StepRegister;
