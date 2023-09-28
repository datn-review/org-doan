import React from "react";
import { typeofValue } from "@org/utils";

type Props = {
  children: any;
  when: any;
  fallback?: any;
};

export function Show(props: Props) {
  const { children, when, fallback } = props;

  if (when) {
    if (typeofValue(children) === "Function") {
      return <>{children()}</>;
    }

    return <>{children}</>;
  }

  if (typeofValue(fallback) === "Function") {
    return <>{fallback()}</>;
  }

  return <>{fallback}</>;
}
