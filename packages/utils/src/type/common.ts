export interface IPropsIcon {
  width: number | string;
  height: number | string;
  fill: string;
}

export type VoidFunction = () => void;

export type TTypeofValue =
  | 'String'
  | 'Number'
  | 'Boolean'
  | 'Object'
  | 'Array'
  | 'Function'
  | 'Undefined'
  | 'Null'
  | 'Symbol'
  | 'BigInt';

export type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any
  ? P
  : never;
