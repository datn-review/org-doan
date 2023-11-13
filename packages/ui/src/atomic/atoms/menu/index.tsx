import { Menu as MenuBase, MenuProps } from "antd";
import { StyleDropdown } from "./styled";
export function Menu(rest: MenuProps) {
  return (
    <StyleDropdown>
      <MenuBase
        {...rest}
        getPopupContainer={(triggerNode: HTMLElement) =>
          triggerNode.parentElement || document.body
        }
      />
    </StyleDropdown>
  );
}
