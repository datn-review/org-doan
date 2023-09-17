import styled, { css } from "styled-components";
import { VARIANT } from "./index";

const Button = styled.button<{ $variant: VARIANT }>`
  min-height: 3.8rem;
  min-width: 13.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  outline: none;

  ${({ $variant }) => {
    switch ($variant) {
      case VARIANT.Primary:
        return css`
          background-color: black;
          color: white;
        `;
      default:
        return css`
          background-color: white;
          color: black;
        `;
    }
  }}
`;

export { Button };
