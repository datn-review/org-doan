import React from 'react';
import { Avatar as AvatarBase, AvatarProps } from 'antd';
export { type MenuProps } from 'antd';
export function Avatar(rest: AvatarProps) {
  return (
    <>
      <AvatarBase {...rest} />
    </>
  );
}
