import { GFW } from '@contants/post-message-action';

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

export type TAction<TPayload = void> = {
  type: TPostMessageGFW;
  payload?: TPayload;
};
export type TFunction<T> = (event: MessageEvent<TAction>, self: T) => void;

// type TPocketChart = keyof typeof TYPE_POCKET_PM;
//
// export type TypePocketChart = {
//     [K in TPocketChart]: keyof typeof TYPE_POCKET_PM[K];
// }[TPocketChart];

// ------------ type util ------------
type TObjectNested<T> = T extends Record<string, Record<string, any>>
  ? TObjectNested<T[keyof T]>
  : keyof T;

export type TPostMessageGFW = TObjectNested<typeof GFW>;
