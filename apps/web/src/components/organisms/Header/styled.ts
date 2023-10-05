import styled from '@emotion/styled/macro';
import { COLOR, ZIndex } from '@org/utils';

export const Header = styled.div`
  position: relative;
  box-shadow: 0 2px 6px rgba(47, 43, 61, 0.14), 0 0 transparent, 0 0 transparent;
  z-index: ${ZIndex.Header};
`;
export const HeaderUser = styled.div`
  border-bottom: 0.08rem solid ${COLOR.Secondary}30;
  height: 6.5rem;
`;

export const HeaderCategory = styled.div``;
