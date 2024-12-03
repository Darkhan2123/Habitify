// src/hocs/withAuth.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Navigate to="/login" replace />
    );
  };
}
