import { Translation } from '@org/i18n';
export enum StatusEnum {
  'all' = 0,
  'active' = 1,
  'inactive' = 2,
  'pending' = 3,
}

export const statusOption = [
  { value: StatusEnum.all, label: <Translation>{(t) => t('all')}</Translation> },
  { value: StatusEnum.active, label: <Translation>{(t) => t('active')}</Translation> },
  { value: StatusEnum.inactive, label: <Translation>{(t) => t('inactive')}</Translation> },
  { value: StatusEnum.pending, label: <Translation>{(t) => t('pending')}</Translation> },
];
