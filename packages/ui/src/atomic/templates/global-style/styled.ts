import styled from '@emotion/styled';
import {
  HEADLINES,
  TEXTS,
  mediaDesktop,
  mediaMiniTablet,
  mediaPhone,
  mediaTablet,
} from '@org/utils';
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
  .section {
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
  }
  .section-layout {
    padding-left: 10rem;
    padding-right: 10rem;

    ${mediaDesktop} {
      padding-left: 6rem;
      padding-right: 6rem;
    }

    ${mediaTablet} {
      padding-left: 4rem;
      padding-right: 4rem;
    }
    ${mediaMiniTablet} {
      padding-left: 2rem;
      padding-right: 2rem;
    }
    ${mediaPhone} {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }

  .scroll-customer {
    padding-bottom: 1rem;
  }
  .scroll-customer::-webkit-scrollbar {
    height: 10px !important;
    cursor: pointer;
    padding-top: 10px;
  }

  /* Track */
  .scroll-customer::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 5px grey; */
    border-radius: 10px;
    padding-top: 10px;
  }

  /* Handle */
  .scroll-customer::-webkit-scrollbar-thumb {
    background: rgb(211, 210, 210);
    border-radius: 10px;
    cursor: pointer;
  }
  .scroll-customer::-webkit-scrollbar-thumb:hover {
    background: #9b9b9b;
  }
`;
