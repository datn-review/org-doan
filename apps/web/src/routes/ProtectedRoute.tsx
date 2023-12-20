import { useAppSelector } from '@org/store';
import { RolesEnum, SiteMap } from '@org/utils';
import { ReactNode } from 'react';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({
  roles,
  component: Component,
}: {
  roles: RolesEnum[];
  component: any;
}) => {
  const { isAuthenticated, authorities } = useAppSelector((state) => state.auth);

  const hasPermission = () => {
    let exits = false;
    roles.forEach((role: RolesEnum) => {
      if (authorities.includes(role)) {
        exits = true;
      }
    });

    return exits;
  };

  if (isAuthenticated) {
    if (roles.length == 0 || hasPermission()) {
      return <Component />;
    } else {
      return <Navigate to='/403' />;
    }
  } else {
    return <Navigate to={SiteMap.Auth.Login.path} />;
  }
};

export default ProtectedRoute;
