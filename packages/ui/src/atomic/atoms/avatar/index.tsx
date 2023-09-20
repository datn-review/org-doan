import React from "react";
// import { Button } from "src/atomic/atoms";
import { Avatar as AvatarBase, AvatarProps } from "antd";
export { type MenuProps } from "antd";
export function Avatar(rest: AvatarProps) {
  return (
    <>
      <AvatarBase {...rest} />
    </>
  );
}
