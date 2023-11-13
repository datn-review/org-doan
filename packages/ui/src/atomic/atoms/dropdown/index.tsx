import React from "react";
// import { Button } from "src/atomic/atoms";
import { Dropdown as DropdownBase, DropdownProps } from "antd";
import { StyleDropdown } from "./styled";
export { type MenuProps } from "antd";
export function Dropdown({ ...rest }: DropdownProps) {
  return (
    <StyleDropdown>
      <DropdownBase
        {...rest}
        getPopupContainer={(triggerNode: HTMLElement) =>
          triggerNode.parentElement || document.body
        }
      />
    </StyleDropdown>
  );
}
