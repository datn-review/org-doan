import { useAppSelector } from "@org/store";
import { RolesEnum, TypeRolesEnum } from "@org/utils";
import React, { PropsWithChildren } from "react";

interface IAuthorizationType {
  type: TypeRolesEnum;
  roles: RolesEnum[];
}

export function useAuthorizationUtil() {
  const { authorities } = useAppSelector((state) => state.auth);

  const ifAnyGranted = (roles: RolesEnum[]) => {
    let exits = false;

    roles.forEach((role: RolesEnum) => {
      if (authorities.includes(role)) {
        exits = true;
      }
    });
    return exits;
  };

  const ifAllGranted = (roles: RolesEnum[]) => {
    let exits = true;

    roles.forEach((role: RolesEnum) => {
      if (!authorities.includes(role)) {
        exits = false;
      }
    });

    return exits;
  };

  const ifNotGranted = (roles: RolesEnum[]) => {
    let exits = false;

    roles.forEach((role: RolesEnum) => {
      if (authorities.includes(role)) {
        exits = true;
      }
    });
    return !exits;
  };

  return {
    ifAnyGranted,
    ifAllGranted,
    ifNotGranted,
    authorities,
  };
}

export const Authorization = (
  props: IAuthorizationType & PropsWithChildren
) => {
  const { authorities } = useAppSelector((state) => state.auth);

  const ifAnyGranted = (roles: RolesEnum[]) => {
    let exits = false;

    roles.forEach((role: RolesEnum) => {
      if (authorities.includes(role)) {
        exits = true;
      }
    });

    return exits;
  };

  const ifAllGranted = (roles: RolesEnum[]) => {
    let exits = true;

    roles.forEach((role: RolesEnum) => {
      if (!authorities.includes(role)) {
        exits = false;
      }
    });
    return exits;
  };

  const ifNotGranted = (roles: RolesEnum[]) => {
    let exits = false;

    roles.forEach((role: RolesEnum) => {
      if (authorities.includes(role)) {
        exits = true;
      }
    });

    return !exits;
  };

  if (
    props.type === TypeRolesEnum.IF_NOT_GRANTED &&
    ifNotGranted(props.roles)
  ) {
    return <>{props.children}</>;
  } else if (
    props.type === TypeRolesEnum.IF_ALL_GRANTED &&
    ifAllGranted(props.roles)
  ) {
    return <>{props.children}</>;
  } else if (
    props.type === TypeRolesEnum.IF_ANY_GRANTED &&
    ifAnyGranted(props.roles)
  ) {
    return <>{props.children}</>;
  } else {
    return null;
  }
};
