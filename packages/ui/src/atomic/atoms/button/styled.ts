import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { SIZE, TYPE_BUTTON, VARIANT } from "./index";
import { COLOR, COLOR_RGB } from "@org/utils/src/constant/themes/color";
import {mediaDesktop, mediaMiniTablet, mediaTablet} from "@org/utils";

const Button = styled.button<{
  $type: TYPE_BUTTON;
  $variant: VARIANT;
  $size: SIZE;
}>`
  /* min-height: 3.8rem; */
  /* min-width: 13.2rem; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  outline: none;
  border: 1px solid;
  font-weight: 500;
  gap: 0.8rem;
  line-height: 3.8rem;
  color: white;

  ${({ $type }) =>
    css`
      border-color: ${COLOR[$type]};
      background-color: ${COLOR[$type]};
    `}
  ${({ $type, $variant }) => {
    switch ($variant) {
      case VARIANT.Outlined:
        return css`
          background-color: white;
          color: ${COLOR[$type]};
          box-shadow: rgba(47, 43, 61, 0.14) 0px 2px 6px 0px,
            rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;

          &:hover {
            background-color: ${COLOR[$type]}20;
          }
        `;
      case VARIANT.Text:
        return css`
          border-color: transparent;
          background-color: white;
          color: ${COLOR[$type]};
          &:hover {
            background-color: ${COLOR[$type]}20;
          }
        `;
      case VARIANT.Circle:
        return css`
          border-radius: 2rem;
        `;
      case VARIANT.Menu:
        return css`
          background: linear-gradient(
            72.47deg,
            rgb(${COLOR_RGB.Primary}) 22.16%,
            rgba(${COLOR_RGB.Primary}, 0.7) 76.47%
          ) !important;
          box-shadow: 0 2px 6px rgba(${COLOR_RGB.Primary}, 0.48);
          font-weight: 500;
          border: none;
          & * {
            color: white !important;
          }
        `;

      default:
        return css`
          font-weight: 600;
          box-shadow: rgba(47, 43, 61, 0.14) 0px 2px 6px 0px,
            rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
        `;
    }
  }}
      ${({ $size }) => {
    switch ($size) {
      case SIZE.ExtraLarge:
        return css`
          padding: 0 2.8rem;
          height: 5.4rem;
          font-size: 1.9rem;
     

   
          ${mediaTablet} {
            padding: 0 2rem;
            font-size: 1.7rem;
          }
      
        `;
      case SIZE.Large:
        return css`
          padding: 0 2.4rem;
          height: 4.6rem;
          font-size: 1.7rem;
          ${mediaTablet} {
            padding: 0 1.4rem;
            height: 4rem;
            
            font-size: 1.6rem;
          }
        `;
      case SIZE.Normal:
        return css`
          padding: 0 2rem;
          height: 3.8rem;
          font-size: 1.5rem;
          ${mediaTablet} {
            padding: 0 1rem;
            font-size: 1.3rem;
            height: 3.2rem;
            
          }
        `;
      case SIZE.ExtraSmall:
        return css`
          padding: 0 1.6rem;
          height: 3rem;
          font-size: 1.3rem;
          ${mediaTablet} {
            padding: 0 .6rem;
            font-size: 1.2rem;
            height: 2.6rem;
            
          }
        `;
      case SIZE.Small:
        return css`
          padding: 0 1.2rem;
          height: 2.2rem;
          font-size: 1.1rem;
          ${mediaTablet} {
            padding: 0 .4rem;
            font-size: 1rem;
            height: 2rem;
          }
        `;
      case SIZE.Menu:
        return css`
          padding: 0 1.2rem;
          height: 3.8rem;
          font-size: 1.5rem;
          ${mediaTablet} {
            padding: 0 1rem;
            font-size: 1.3rem;
          }
        `;

      default:
        return css``;
    }
  }};
`;

const Default = css``;
const Outlined = css``;
const Text = css``;

const ExtraLarge = css`
  padding: 0 2.8rem;
  height: 5.4rem;
`;
const Large = css`
  padding: 0 2.4rem;
  height: 4.6rem;
`;
const Normal = css`
  padding: 0 2rem;
  height: 3.8rem;
`;
const Small = css`
  padding: 0 1.6rem;
  height: 3rem;
`;
const ExtraSmall = css`
  padding: 0 1.2rem;
  height: 2.2rem;
`;

export {
  Button,
  Default,
  Outlined,
  Text,
  ExtraLarge,
  Large,
  Normal,
  Small,
  ExtraSmall,
};
