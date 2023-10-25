import { css, cx } from '@emotion/css';
import { BoxCenter, Col, Row, Space } from '@org/ui';
import { COLOR } from '@org/utils';
import React from 'react';
const cssTextSection = css`
  font-size: 32px;
  color: ${COLOR.Primary};
  font-weight: 700;
  padding: 10px 0;
  margin-bottom: 26px;
  position: relative;
  &:after {
    content: '';
    width: 120px;
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
    <footer
      className={cx(
        css`
          background: url(/assets/image/footer_img_svg.png);
          background-position: 0 bottom;
          background-repeat: no-repeat;
          background-size: 100%;
          min-height: 465px;
        `,
        'px-[10rem] py-[2rem]',
      )}
    >
      {/* <Row>
        <Col span={12}>
          <h4>Chăm Sóc Khách Hàng</h4>
          <Row>
            <Col span={12}>
              <Space>Trung Tâm Trợ Giúp</Space>
              <Space>
                Email: <b>phamthanhtam512@gmail.com</b>
              </Space>
              <Space>
                Đường dây nóng: <b>0792920565</b>
              </Space>
            </Col>
            <Col span={12}>
              <Space>Hình Thức Thanh Toán</Space>
              <Space>Vẫn Chuyển - Trả Hàng & Hoàn Tiền</Space>
              <Space>Chính Sách Bảo Mật</Space>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <h4>Chăm Sóc Khách Hàng</h4>

          <Space>Giới Thiệu Về TutorSmart</Space>
          <Space>Liên Hệ Với Chúng Tôi</Space>
          <Space>Sơ Đồ Trang Web</Space>
        </Col>
        <Col span={6}>
          <h4>Sân Chơi</h4>

          <Space>Bản Tin Trường Học</Space>
          <Space>Thử Tài đó Vui</Space>
          <Space>Hỏi Bài Và chữa B</Space>
        </Col>
      </Row> */}
      <Space
        className='container-fluid navigation'
        id='layout_navigation'
      ></Space>

      <Row gutter={10}>
        <Col span={12}>
          <Space className={cssTextSection}>SmartTutor</Space>
          {/* <img
              src='/assets/image/logo.jpg'
              alt='logo'
              height={50}
              width={226}
            /> */}
          <Space>
            SmartTutor.vn là một trải nghiệm học tập tuyệt vời, cung cấp những khoá học online chất
            lượng cao cho học sinh tiểu học, THCS và THPT. Với sự hợp tác chuyên môn của các giáo
            viên hàng đầu cùng phương pháp học tập cá nhân hoá và sự hỗ trợ của công nghệ giúp các
            em luôn hào hứng trong việc học tập, nắm chắc được vấn đề từ đó hiểu sâu nhớ lâu và học
            thật tốt chương trình trên lớp cũng như đạt kết quả cao trong các kỳ thi.
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
        <Col span={6}>
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
        <Col span={6}>
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
    </footer>
  );
}
