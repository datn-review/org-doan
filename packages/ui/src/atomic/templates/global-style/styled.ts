import styled from '@emotion/styled/macro';
import {
  COLOR,
  HEADLINES,
  TEXTS,
  mediaDesktop,
  mediaMiniTablet,
  mediaPhone,
  mediaTablet,
} from '@org/utils';
export const Wrapper = styled.div`
  background: #f7f6f9;
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
    line-height: ${HEADLINES.H2.LineHeight};

    ${mediaTablet} {
      font-size: ${HEADLINES.H2_SM.FontSize};
      font-weight: ${HEADLINES.H2_SM.FontWeight};
      line-height: ${HEADLINES.H2_SM.LineHeight};
    }
  }
  h3,
  .H3 {
    font-size: ${HEADLINES.H3.FontSize};
    font-weight: ${HEADLINES.H3.FontWeight};
    line-height: ${HEADLINES.H3.LineHeight};
    ${mediaTablet} {
      font-size: ${HEADLINES.H3_SM.FontSize};
      font-weight: ${HEADLINES.H3_SM.FontWeight};
      line-height: ${HEADLINES.H3_SM.LineHeight};
    }
  }
  h4,
  .H4 {
    font-size: ${HEADLINES.H4.FontSize};
    font-weight: ${HEADLINES.H4.FontWeight};
    line-height: ${HEADLINES.H4.LineHeight};
    ${mediaTablet} {
      font-size: ${HEADLINES.H4_SM.FontSize};
      font-weight: ${HEADLINES.H4_SM.FontWeight};
      line-height: ${HEADLINES.H4_SM.LineHeight};
    }
  }
  h5,
  .H5 {
    font-size: ${HEADLINES.H5.FontSize};
    font-weight: ${HEADLINES.H5.FontWeight};
    line-height: ${HEADLINES.H5.LineHeight};
    ${mediaTablet} {
      font-size: ${HEADLINES.H6.FontSize};
      font-weight: ${HEADLINES.H6.FontWeight};
      line-height: ${HEADLINES.H6.LineHeight};
    }
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
    max-width: 144rem;
    box-shadow: 0 2px 6px rgba(47, 43, 61, 0.14), 0 0 transparent, 0 0 transparent;
    //margin: 0 auto;

    ${mediaDesktop} {
      padding: 2rem;
    }

    ${mediaTablet} {
      padding: 1.5rem;
    }
    ${mediaMiniTablet} {
      padding: 1rem;
    }
    ${mediaPhone} {
      padding: 0.5rem;
    }
  }
  .section-layout {
    padding-left: 2rem;
    padding-right: 2rem;
    max-width: 144rem;
    margin: 0 auto;

    ${mediaDesktop} {
      padding-left: 1.8rem;
      padding-right: 1.8rem;
    }

    ${mediaTablet} {
      padding-left: 1.2rem;
      padding-right: 1.2rem;
    }
    ${mediaMiniTablet} {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    ${mediaPhone} {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }

  .section-layout-header {
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
  .fc-header-toolbar {
    .fc-button-primary {
      background-color: ${COLOR.Secondary};
      border-color: ${COLOR.White};
    }
    .fc-button-active {
      background-color: ${COLOR.Primary} !important;
      border-color: ${COLOR.White} !important;
    }
  }
`;
