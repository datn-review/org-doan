export interface IPropsIcon {
  width: number | string;
  height: number | string;
  fill: string;
}

export interface VoidFunction {
  (): void;
}
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
