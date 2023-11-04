import { css, cx } from '@emotion/css';
import { Space } from '@org/ui';
import { PropsWithChildren } from 'react';

export function CRUDTemplate({ children }: PropsWithChildren) {
  return <Space className={cx('section-layout')}>{children}</Space>;
}
