import { css, cx } from '@emotion/css/macro';
import { Space, BoxCenter, TextSection, Row, Col } from '@org/ui';
import { COLOR, COLOR_RGB } from '@org/utils';
import React from 'react';
const cssStep = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.2rem;
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
    text: 'Chọn Khóa Học',
  },
  {
    number: 2,
    bg: '#ff6609',
    text: 'Học Thử Miễn Phí',
  },
  {
    number: 3,
    bg: '#1dc2da',
    text: 'Nộp Học Phí',
  },
  {
    number: 4,
    bg: '#327ad5',
    text: 'Vào Học',
    isLast: true,
  },
];
function StepRegister() {
  return (
    <Space>
      <Space className={'section-layout'}>
        <BoxCenter>
          <TextSection color={COLOR.Black}>
            THAM GIA SMARTTUTOR.COM DỄ DÀNG CHỈ VỚI 4 BƯỚC
          </TextSection>
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
                Bước {number}
              </Space>
              <BoxCenter
                className={css`
                  margin-top: 1.4rem;
                  background-color: ${COLOR.White};
                  padding: 3rem 0;
                  font-weight: 600;
                  font-size: 2rem;
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
        `}
      >
        <Col
          span={6}
          className={css`
            text-align: center;
          `}
        >
          <h1>100.000+</h1>
          <h5>HỌC VIÊN</h5>
        </Col>
        <Col
          span={6}
          className={css`
            text-align: center;
          `}
        >
          <h1>5.000+</h1>
          <h5>BÀI GIẢNG</h5>
        </Col>
        <Col
          span={6}
          className={css`
            text-align: center;
          `}
        >
          <h1>300.000+</h1>
          <h5>BÀI ÔN TẬP</h5>
        </Col>
        <Col
          span={6}
          className={css`
            text-align: center;
          `}
        >
          <h1>3.000+</h1>
          <h5>ĐỀ LUYỆN THI</h5>
        </Col>
      </Row>
    </Space>
  );
}

export default StepRegister;
