import type {
  ForwardRefExoticComponent,
  PropsWithChildren,
  RefAttributes,
} from "react";

type FunctionHasChildrenType = ({ children }: PropsWithChildren) => JSX.Element;

type FunctionInjectType = FunctionHasChildrenType;

type AppType =
  | ForwardRefExoticComponent<Omit<any, "ref"> & RefAttributes<any>>
  | any;

export type ComponentInjectPropsType = {
  providers?: FunctionInjectType[];
  /** containers: logic + ui + store */
  containers?: FunctionHasChildrenType[];
  template?: FunctionHasChildrenType[];
  services?: FunctionHasChildrenType[];
  bootstrap: AppType;
};
