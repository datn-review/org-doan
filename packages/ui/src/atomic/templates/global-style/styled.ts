import styled from "@emotion/styled";
import { HEADLINES, TEXTS } from "@org/utils";
export const Wrapper = styled.div`
  h1,
  .H1 {
    font-size: ${HEADLINES.H1.FontSize};
    font-weight: ${HEADLINES.H1.FontWeight};
    line-height: ${HEADLINES.H1.LineHeight};
  }
  h2,
  .H2 {
    font-size: ${HEADLINES.H2.FontSize};
    font-weight: ${HEADLINES.H2.FontWeight};
    line-height: ${HEADLINES.H3.LineHeight};
  }
  h3,
  .H3 {
    font-size: ${HEADLINES.H3.FontSize};
    font-weight: ${HEADLINES.H3.FontWeight};
    line-height: ${HEADLINES.H3.LineHeight};
  }
  h4,
  .H4 {
    font-size: ${HEADLINES.H4.FontSize};
    font-weight: ${HEADLINES.H4.FontWeight};
    line-height: ${HEADLINES.H4.LineHeight};
  }
  h5,
  .H5 {
    font-size: ${HEADLINES.H5.FontSize};
    font-weight: ${HEADLINES.H5.FontWeight};
    line-height: ${HEADLINES.H5.LineHeight};
  }
  h6,
  .H6 {
    font-size: ${HEADLINES.H6.FontSize};
    font-weight: ${HEADLINES.H6.FontWeight};
    line-height: ${HEADLINES.H6.LineHeight};
  }

  .TextSub1 {
    font-size: ${TEXTS.TextSub1.FontSize};
    font-weight: ${TEXTS.TextSub1.FontWeight};
    line-height: ${TEXTS.TextSub1.LineHeight};
  }

  .TextSub2 {
    font-size: ${TEXTS.TextSub2.FontSize};
    font-weight: ${TEXTS.TextSub2.FontWeight};
    line-height: ${TEXTS.TextSub2.LineHeight};
  }

  .TextBody2 {
    font-size: ${TEXTS.TextBody2.FontSize};
    font-weight: ${TEXTS.TextBody2.FontWeight};
    line-height: ${TEXTS.TextBody2.LineHeight};
  }

  .TextBody2 {
    font-size: ${TEXTS.TextBody2.FontSize};
    font-weight: ${TEXTS.TextBody2.FontWeight};
    line-height: ${TEXTS.TextBody2.LineHeight};
  }
`;
