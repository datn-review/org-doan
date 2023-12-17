import { css, cx } from '@emotion/css';
import { useTranslation } from '@org/i18n';
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
  const { t } = useTranslation();
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
              <Space>{t('footer.content1')}</Space>
              <Space dangerouslySetInnerHTML={{ __html: t('footer.content2') }} />
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
                  <Space className={cssTextSection}>{t('footer.title1')}</Space>
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
                  <Space className={cssTextSection}>{t('footer.title2')}</Space>
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
