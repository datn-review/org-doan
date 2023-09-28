import React, { forwardRef } from "react";
import type { PropsWithChildren, CSSProperties, HTMLAttributes } from "react";

type Props = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    style?: CSSProperties;
    className?: string | any;
  };

export const Space = forwardRef(function Space(props: Props, ref?: any) {
  return (
    <div {...props} ref={ref} className={props.className} style={props.style}>
      {props.children}
    </div>
  );
});
