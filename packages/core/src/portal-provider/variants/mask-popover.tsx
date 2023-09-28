import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";
import { useClickAnyWhere } from "usehooks-ts";
import { css } from "@emotion/css";
import { usePopover } from "../hooks";

export type TPopoverMaskProps = {
  left?: string;
  top?: string;
  afterClose?: () => void;
  domNode?: any;
  isCloseMask?: boolean;
};
type TPopoverProps = PropsWithChildren & TPopoverMaskProps;

export function MaskPopover({
  children,
  isCloseMask,
  left,
  top,
  afterClose,
  domNode,
}: TPopoverProps) {
  const { close } = usePopover();

  useEffect(() => {
    if (isCloseMask) {
      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.code) {
          case "Escape": {
            close();
            break;
          }
          default:
            break;
        }
      };
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  const popoverRef = useRef<HTMLDivElement>(null);

  useClickAnyWhere((event) => {
    if (!isCloseMask) return;
    if (domNode.contains(event.target)) return;

    close();
  });

  useEffect(() => {
    return () => {
      if (afterClose) {
        afterClose();
      }
    };
  }, []);

  return (
    <div
      ref={popoverRef}
      // hard code
      className={css`
        position: absolute;
        z-index: 999;
      `}
      style={{ left, top }}
    >
      {children}
    </div>
  );
}
