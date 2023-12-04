import { css, cx } from '@emotion/css';
import { BoxCenter, Col, Row, Space } from '@org/ui';
import { COLOR } from '@org/utils';
import React from 'react';
const cssTextSection = css`
  font-size: 2.6rem;
  color: ${COLOR.Primary};
  font-weight: 700;
  padding: 10px 0;
  margin-bottom: 26px;
  position: relative;
  &:after {
    content: '';
    width: 100px;
    height: 6px;
    border-radius: 12px;
    background-color: #ff5520;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;
export function Footer() {
  return (
    <Space
      className={css`
        background-color: white;
        box-shadow: 0 -1px 3px rgba(47, 43, 61, 0.14), 0 0 transparent, 0 0 transparent;
      `}
    >
      <footer
        className={cx(
          css`
            background: url(/assets/image/footer_img_svg.png);
            background-position: 0 bottom;
            background-repeat: no-repeat;
            background-size: 100%;
            min-height: 465px;
          `,
          'py-[2rem]',
        )}
      >
        <Space className={'section-layout section-footer'}>
          <Row gutter={10}>
            <Col
              span={24}
              sm={14}
              md={12}
            >
              <Space className={cssTextSection}>SmartTutor</Space>
              {/* <img
              src='/assets/image/logo.jpg'
              alt='logo'
              height={50}
              width={226}
            /> */}
              <Space>
                SmartTutor.vn là một trải nghiệm học tập tuyệt vời, cung cấp những khoá học online
                chất lượng cao cho học sinh tiểu học, THCS và THPT. Với sự hợp tác chuyên môn của
                các giáo viên hàng đầu cùng phương pháp học tập cá nhân hoá và sự hỗ trợ của công
                nghệ giúp các em luôn hào hứng trong việc học tập, nắm chắc được vấn đề từ đó hiểu
                sâu nhớ lâu và học thật tốt chương trình trên lớp cũng như đạt kết quả cao trong các
                kỳ thi.
              </Space>
              <Space>
                <b>
                  CÔNG TY CỔ PHẦN SmartTutor
                  <b>
                    <br />
                    Địa chỉ: Tam Vinh - Phú Ninh - Quảng Nam.
                    <br />
                    Mã số thuế: 0109906427
                    <br />
                    Ngày cấp: 16/02/2022 - Nơi cấp: Sở Kế hoạch và Đầu tư thành phố Hà Nội
                    <br />
                    Email: smartTutor@edu.vn
                    <br />
                    Điện thoại: 0792920565
                    <br />
                    Website: smartTutor.vn
                  </b>
                </b>
              </Space>
            </Col>

            <Col
              sm={10}
              md={12}
              span={24}
            >
              <Row gutter={[0, 20]}>
                <Col
                  span={12}
                  sm={24}
                  md={12}
                >
                  <Space className={cssTextSection}>Tải Ứng Dụng</Space>
                  <Space className={'flex'}>
                    <img
                      src='https://static-xxx.vuihoc.vn/theme/vuihoc/imgs/dowload_appstore.png'
                      className='icon_dowload_app'
                      alt='dowload app vuihoc in Appstore'
                    />
                    <img
                      src='https://static-xxx.vuihoc.vn/theme/vuihoc/imgs/dowload_playstore.png'
                      className='icon_dowload_app'
                      alt='dowload app vuihoc in Playstore'
                    ></img>
                  </Space>
                </Col>
                <Col
                  span={12}
                  sm={24}
                  md={12}
                >
                  <Space className={cssTextSection}>Kết Nối</Space>
                  <Space className={'flex'}>
                    <img
                      src='https://static-xxx.vuihoc.vn/theme/vuihoc/imgs/dowload_appstore.png'
                      className='icon_dowload_app'
                      alt='dowload app vuihoc in Appstore'
                    />
                    <img
                      src='https://static-xxx.vuihoc.vn/theme/vuihoc/imgs/dowload_playstore.png'
                      className='icon_dowload_app'
                      alt='dowload app vuihoc in Playstore'
                    ></img>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Space>
      </footer>
    </Space>
  );
}
