import { css } from '@emotion/css';
import { Button, Col, Row, Space } from '@org/ui';
import { COLOR } from '@org/utils';
import React from 'react';

function InfoHeader() {
  return (
    <Space>
      <Space>
        <img
          src='https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-5/assets/user-profile-header-bg-ff6c2352.png'
          width={'100%'}
        />
      </Space>
      <Row
        className={css`
          padding: 2.4rem;
          background-color: ${COLOR.White};
        `}
      >
        <Col span={3}>
          <Space>Logo</Space>
        </Col>
        <Col span={21}>
          <h4
            className={css`
              margin-bottom: 1rem;
            `}
          >
            Tam Dep Trai
          </h4>
          <Space className={'flex justify-between'}>
            <Space className={'flex gap-1'}>
              <Space>Toán Lý Văn</Space>
              <Space>Toán Lý Văn</Space>
              <Space>Toán Lý Văn</Space>
            </Space>
            <Space>
              <Button>Connected</Button>
            </Space>
          </Space>
        </Col>
      </Row>
    </Space>
  );
}

export default InfoHeader;
