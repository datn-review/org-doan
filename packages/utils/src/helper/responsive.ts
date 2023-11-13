export enum Media {
  Phone = 576,
  MiniTablet = 768,
  Tablet = 992,
  Desktop = 1200,
}
export enum MediaEnum {
  Phone = 'Phone',
  MiniTablet = 'MiniTablet',
  Tablet = 'Tablet',
  Desktop = 'Desktop',
}

export const breakpoints = [Media.Phone, Media.MiniTablet, Media.Tablet, Media.Desktop];

const mq: Record<Media, string> | any = breakpoints
  .map((bp) => ({
    key: bp,
    value: `@media (max-width: ${bp}px)`,
  }))
  .reduce((a, v) => ({ ...a, [v.key]: v.value }), {});

export const mediaPhone: string = mq?.[Media.Phone];
export const mediaMiniTablet: string = mq?.[Media.MiniTablet];
export const mediaTablet: string = mq?.[Media.Tablet];

export const mediaDesktop: string = mq?.[Media.Desktop];

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
