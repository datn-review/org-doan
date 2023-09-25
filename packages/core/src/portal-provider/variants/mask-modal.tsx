import type { ReactNode } from "react";
import { Fragment, useEffect } from "react";
import { handleExecuteEvent } from "@org/utils";
import { useModal } from "../hooks";
import { css } from "@emotion/css";

type Props = {
  children: ReactNode;
  isCloseMask: boolean | undefined;
  zIndex?: number;
};

export function MaskModal({ children, isCloseMask, zIndex }: Props) {
  const { close } = useModal();

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
  return (
    <Fragment>
      <div
        className={css`
          position: absolute;
          inset: 0;
          background-color: #ffffffcc;
        `}
        onClick={handleExecuteEvent(isCloseMask, close)}
        style={{ zIndex }}
      />
      <div
        className={css`
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `}
        style={{
          zIndex: zIndex ? zIndex + 10 : undefined,
        }}
      >
        {children}
      </div>
    </Fragment>
  );
}
