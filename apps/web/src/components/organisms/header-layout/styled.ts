import styled from '@emotion/styled/macro';
import { COLOR, COLOR_RGB, ZIndex, mediaDesktop } from '@org/utils';

export const Header = styled.div`
  background: #fff;
  position: relative;
  box-shadow: 0 2px 6px rgba(47, 43, 61, 0.14), 0 0 transparent, 0 0 transparent;
  z-index: ${ZIndex.Header};
  .section-header {
    ${mediaDesktop} {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row-reverse;
      width: 100%;
      .logo {
        display: none;
      }
    }
  }
`;
export const HeaderUser = styled.div`
  border-bottom: 0.08rem solid ${COLOR.Secondary}30;
  height: 6.5rem;
`;

export const HeaderCategory = styled.div`
  .ant-dropdown-menu {
    .ant-dropdown-menu-item-selected {
      background-color: rgba(${COLOR_RGB.Primary}, 0.1) !important;
      span {
        color: ${COLOR.Primary} !important;
      }
    }
    .ant-dropdown-menu-title-content {
      font-weight: 500;
    }
  }
`;
