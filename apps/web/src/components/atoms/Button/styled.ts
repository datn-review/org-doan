import { styled } from 'styled-components/macro';
import { css } from 'styled-components';
import { TypeButton } from '@contants/type';

export const Button = styled.button<{ $type: TypeButton }>`
  font-family: HelveticaNeue, sans-serif;
  font-size: 12px;
  padding: 4px 12px;
  margin-bottom: 0;
  line-height: 20px;
  color: #000;
  &:focus-visible {
    outline: 2px solid #4f7aa6 !important;
    box-shadow: none !important;
  }
  ${({ $type }) => {
    switch ($type) {
      case TypeButton.Primary:
        return css`
          font-family: Roboto, sans-serif !important;
          background-color: rgb(53, 121, 193);
          color: #fff;
          border-radius: 4px;
          font-size: 14px;
          padding: 6px 12px;
          min-width: 104px;
          font-weight: 400;
          cursor: pointer;
        `;
      case TypeButton.Secondary:
        return css`
          font-family: Roboto, sans-serif !important;
          border-radius: 4px;
          font-size: 14px;
          padding: 6px 12px;
          min-width: 104px;
          font-weight: 400;
          color: #373737;
          background-color: #dddbda;
        `;
      case TypeButton.Pagination: {
        return css`
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
          cursor: pointer;
          background-color: #f5f5f5;
          background-repeat: repeat-x;
          border: 1px solid #ccc;
          border-color: #e6e6e6 #e6e6e6 #bfbfbf;
          border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
          border-bottom-color: #b3b3b3;

          border-radius: 4px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
          text-decoration: none;
        `;
      }
    }
  }}
`;
