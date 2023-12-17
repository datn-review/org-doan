import { COLOR } from '@org/utils';
import { ConfigProvider, Space } from 'antd';
import React, { PropsWithChildren } from 'react';
import { css } from '@emotion/css';
import './antd-styled.scss';
import { i18next } from '@org/i18n';
import localeEN from 'antd/es/date-picker/locale/en_US';
import localeVI from 'antd/es/date-picker/locale/vi_VN';

// import 'dayjs/locale/en-US';
// import 'dayjs/locale/vi-VI';

export function AntdProvider({ children }: PropsWithChildren) {
  return (
    <ConfigProvider
      // locale={i18next.language === 'en-EN' ? localeEN : localeVI}
      theme={{
        components: {
          Button: {
            colorPrimary: COLOR.Primary,
            algorithm: true,
          },
          Select: {
            colorPrimary: COLOR.Primary,
            algorithm: true,
            colorPrimaryActive: COLOR.Primary,
            colorBgTextActive: COLOR.Primary,
          },
          Dropdown: {
            colorPrimary: COLOR.Primary,
            algorithm: true,
          },
          Table: {
            colorPrimary: COLOR.Primary,
            algorithm: true,
          },
          Pagination: {
            colorPrimary: COLOR.Primary,
            algorithm: true,
          },
          Checkbox: {
            colorPrimary: COLOR.Primary,
            algorithm: true,
          },
          Tabs: {
            colorPrimary: COLOR.Primary,
            algorithm: true,
          },
          DatePicker: {
            colorPrimary: COLOR.Primary,
            algorithm: true,
          },
          Cascader: {
            colorPrimary: COLOR.Primary,
            algorithm: true,
          },
          ColorPicker: {
            colorPrimary: COLOR.Primary,
            algorithm: true,
          },
          Radio: {
            colorPrimary: COLOR.Primary,
            algorithm: true,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
