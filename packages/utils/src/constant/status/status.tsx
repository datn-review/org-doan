import { Translation } from '@org/i18n';
export enum StatusEnum {
  'all' = 0,
  'active' = 1,
  'inactive' = 2,
  'pending' = 3,
}
interface IStatus {
  value: StatusEnum;
  label: JSX.Element;
}

export const statusOption: IStatus[] = [
  { value: StatusEnum.all, label: <Translation>{(t) => t('all')}</Translation> },
  { value: StatusEnum.active, label: <Translation>{(t) => t('active')}</Translation> },
  { value: StatusEnum.inactive, label: <Translation>{(t) => t('inactive')}</Translation> },
  { value: StatusEnum.pending, label: <Translation>{(t) => t('pending')}</Translation> },
];

export const statusOptionUpsert: IStatus[] = [
  { value: StatusEnum.active, label: <Translation>{(t) => t('active')}</Translation> },
  { value: StatusEnum.inactive, label: <Translation>{(t) => t('inactive')}</Translation> },
  { value: StatusEnum.pending, label: <Translation>{(t) => t('pending')}</Translation> },
];
