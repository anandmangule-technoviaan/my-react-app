import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, ROLE_REDIRECTS } from '@/context/AuthContext';

export default function RoleRoute({ allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role;

  if (!allowedRoles.includes(userRole)) {
    const defaultRedirect = ROLE_REDIRECTS[userRole] || '/dashboard/profile';
    return <Navigate to={defaultRedirect} replace />;
  }

  return <Outlet />;
}
