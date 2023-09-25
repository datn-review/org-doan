import { type ReactNode } from "react";

export interface IPropsPortal {
  domNode?: Element;
  isNested?: boolean;
}
export type TPortal = ReactNode | ((portals: ReactNode[]) => ReactNode);

export interface IFnModal {
  openPortal: (portal: TPortal, propsModal?: IPropsPortal) => void;
  destroyPortal: VoidFunction;
  closePortal: VoidFunction;
}
interface IStateModal {
  portals: ReactNode[];
}
export interface IModal extends IFnModal, IStateModal {}
