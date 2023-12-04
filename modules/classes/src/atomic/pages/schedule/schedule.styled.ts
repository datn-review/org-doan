import { css } from '@emotion/css';
import { COLOR } from '@org/utils';

export const timePickerCss = css`
  button {
    background-color: ${COLOR.Primary};
  }
  .ant-picker-time-panel-column:last-child {
    li {
      display: none !important;
    }
    li:nth-of-type(1) {
      display: block !important;
    }
    li:nth-of-type(6) {
      display: block !important;
    }
    li:nth-of-type(11) {
      display: block !important;
    }

    li:nth-of-type(16) {
      display: block !important;
    }
    li:nth-of-type(21) {
      display: block !important;
    }
    li:nth-of-type(26) {
      display: block !important;
    }
    li:nth-of-type(31) {
      display: block !important;
    }
    li:nth-of-type(36) {
      display: block !important;
    }
    li:nth-of-type(41) {
      display: block !important;
    }
    li:nth-of-type(46) {
      display: block !important;
    }
    li:nth-of-type(51) {
      display: block !important;
    }
    li:nth-of-type(56) {
      display: block !important;
    }
  }
`;
