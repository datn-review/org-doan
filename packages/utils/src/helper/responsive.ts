export enum Media {
  Phone = 576,
  MiniTablet = 768,
  Tablet = 992,
  Desktop = 1200,
}
export const breakpoints = [Media.Phone, Media.MiniTablet, Media.Tablet, Media.Desktop];

const mq: Record<Media, string> | any = breakpoints
  .map((bp) => ({
    key: bp,
    value: `@media (max-width: ${bp}px)`,
  }))
  .reduce((a, v) => ({ ...a, [v.key]: v.value }), {});

export const mediaPhone: string = mq?.[Media.Phone].value;
export const mediaMiniTablet: string = mq?.[Media.MiniTablet].value;
export const mediaTablet: string = mq?.[Media.Tablet].value;
export const mediaDesktop: string = mq?.[Media.Desktop].value;

// export const mediaPhone = (cssArg: Emotion['css']) => css`
//   @media only screen and (max-width: 576px) {
//     ${cssArg}
//   }
// `;
// export const mediaTablet = (css: Emotion['css']) => css`
//   @media only screen and (max-width: 992px) {
//     ${css``}
//   }
// `;
