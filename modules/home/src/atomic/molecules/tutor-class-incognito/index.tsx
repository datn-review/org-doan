import { css, cx } from '@emotion/css/macro';
import { Space, BoxCenter, TextSection, Row, Col } from '@org/ui';
import { COLOR, COLOR_RGB } from '@org/utils';
import comment from './image/comment.png';
import personalized from './image/personalized.png';

import result from './image/result.png';

const steps = [
  {
    title: 'THEO DÕI KẾT QUẢ HỌC TẬP',
    bg: '#FFC6A3',
    text: 'Báo cáo học tập được cập nhật liên tục theo kết quả học tập - Giúp phụ huynh kịp thời nắm bắt và điều chỉnh để giúp em học tập tốt hơn.',
    image: personalized,
  },
  {
    title: 'GIÁO VIÊN NHẬN XÉT ĐỊNH KỲ',
    bg: '#B3E0F5',
    text: 'Phụ huynh có thể nắm chắc 100% điểm mạnh, điểm yếu & tiềm năng của con thông qua đánh giá định kì của giáo viên',
    image: comment,
  },
  {
    title: 'LỘ TRÌNH HỌC CÁ NHÂN HÓA',
    bg: '#FFDC99',
    text: 'Lộ trình học được thiết kế sát với năng lực của con. Sự tiến bộ được đánh giá liên tục thông qua hệ thống bài kiểm tra chất lượng',
    image: result,
  },
];
function TutorClass() {
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
          <TextSection color={COLOR.Black}>Lớp học gia sư tại SmartTutor.com</TextSection>
        </BoxCenter>
        <Row gutter={10}>
          {steps.map(({ bg, title, text, image }) => (
            <Col span={8}>
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
                    alt={title}
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
