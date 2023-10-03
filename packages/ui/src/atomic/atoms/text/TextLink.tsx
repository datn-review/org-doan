import { css, cx } from "@emotion/css";
import { COLOR } from "@org/utils";
import React, { HTMLAttributes, PropsWithChildren } from "react";

function TextLink({
  children,
  className,
  ...props
}: PropsWithChildren & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cx(
        css`
          color: ${COLOR.Primary};
        `,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default TextLink;
