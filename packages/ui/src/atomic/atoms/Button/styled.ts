import styled, { css } from "styled-components";
import { SIZE, TYPE_BUTTON, VARIANT } from "./index";
import { COLOR } from "./../../../../../utils/src/constant/themes/color";

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
        `;
      case SIZE.Large:
        return css`
          padding: 0 2.4rem;
          height: 4.6rem;
          font-size: 1.7rem;
        `;
      case SIZE.Normal:
        return css`
          padding: 0 2rem;
          height: 3.8rem;
          font-size: 1.5rem;
        `;
      case SIZE.ExtraSmall:
        return css`
          padding: 0 1.6rem;
          height: 3rem;
          font-size: 1.3rem;
        `;
      case SIZE.Small:
        return css`
          padding: 0 1.2rem;
          height: 2.2rem;
          font-size: 1.1rem;
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
