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
  [6]: 'classes.success',
  [7]: 'request.close.contact',
  [8]: 'closed.contact',
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
  ReqCloseContact = 7,
  SuccessCloseContact = 8,
}
export enum EnumStatusAssignment {
  Pending = 1,
  Complete = 2,
  Expired = 3,
  Active = 4,
}

export const EnumStatusAssignmentColor = {
  [2]: 'success',
  [1]: 'processing',
  [3]: 'error',
  [4]: 'success',
};

export const StatusRegistrationColor = {
  [5]: 'success',
  [6]: 'success',
  [2]: 'error',
  [1]: 'processing',
  [3]: 'warning',
  [4]: 'warning',
  [7]: 'error',
  [8]: 'warning',
};
export const StatusPayColor = {
  [2]: 'success',
  [1]: 'warning',
  [3]: 'error',
  [4]: 'warning',
};

export const StatusPay = {
  [2]: 'pay.active',
  [1]: 'pay.inactive',
  [3]: 'pay.expired',
  [4]: 'closed.contact',
};
