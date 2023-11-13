import { COLOR } from '@org/utils/src/constant/themes/color';
import styled from '@emotion/styled';

export const StyleDropdown = styled.div`
  .ant-dropdown-menu-item {
    padding: 0.8rem 1.6rem !important;
    color: ${COLOR.Primary} !important;
    font-size: 1.5rem !important;
    &:hover {
      * {
        /* color: ${COLOR.Primary} !important; */
      }
    }
  }
  .ant-dropdown-menu-item-selected {
    background-color: ${COLOR.Primary} !important;
    * {
      color: white !important;
      &:hover {
        color: white !important;
      }
    }
  }
`;
