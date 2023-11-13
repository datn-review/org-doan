export enum StatusEnumColor {
  'active' = 'success',
  'inactive' = 'error',
}

export const StatusShowHideColor = {
  [1]: 'success',
  [2]: 'error',
};

export const StatusShowHide = {
  [1]: 'active',
  [2]: 'inactive',
};
export const StatusRegistration = {
  [1]: 'pending',
  [2]: 'rejected',
  [3]: 'pending_signature',
  [4]: 'pending_pay',
  [5]: 'collaboration',
  [6]: 'success',
};

export enum EnumStatusRegistration {
  Pending = 'pending',
  Rejected = 'rejected',
  PendingSignature = 'pending_signature',
  PendingPay = 'pending_pay',
  Collaboration = 'collaboration',
  Completed = 'completed',
}

export enum EnumStatusCollap {
  Pending = 1,
  Rejected = 2,
  PendingSignature = 3,
  PendingPay = 4,
  Collaboration = 5,
  Completed = 6,
}

export const StatusRegistrationColor = {
  [5]: 'success',
  [6]: 'success',
  [2]: 'error',
  [1]: 'processing',
  [3]: 'warning',
  [4]: 'warning',
};
