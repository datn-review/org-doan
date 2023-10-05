export enum RolesEnum {
  WEB_ADMIN = "WEB_ADMIN",
  WEB_STAFF = "WEB_STAFF",

  CENTER_ADMIN = "CENTER_ADMIN",
  CENTER_TUTOR = "CENTER_TUTOR",

  PESONAL_TUTOR = "PESONAL_TUTOR",

  STUDENT = "STUDENT",
  PARENT = "PARENT",
  ANONYMOUS = "ANONYMOUS",
}

export const ROLEID: Record<RolesEnum, number> = {
  [RolesEnum.WEB_ADMIN]: 1,

  [RolesEnum.WEB_STAFF]: 2,

  [RolesEnum.CENTER_ADMIN]: 3,
  [RolesEnum.CENTER_TUTOR]: 4,

  [RolesEnum.PESONAL_TUTOR]: 5,

  [RolesEnum.STUDENT]: 6,
  [RolesEnum.PARENT]: 7,

  [RolesEnum.ANONYMOUS]: 8,
};
export enum TypeRolesEnum {
  IF_NOT_GRANTED = "ifNotGranted",
  IF_ALL_GRANTED = "ifAllGranted",
  IF_ANY_GRANTED = "ifAnyGranted",
}
