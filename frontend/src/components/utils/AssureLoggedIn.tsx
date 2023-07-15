import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authSelector } from '../../features/auth/authSlice';

interface AssureLoggedInProps {
  children: ReactNode;
}

const AssureLoggedIn = ({ children }: AssureLoggedInProps) => {
  const { user } = useSelector(authSelector);
  const isLoggedIn = !!user.token;

  if (!isLoggedIn) {
    return <Navigate to='/auth/login' />;
  }

  return <>{children}</>;
};

export default AssureLoggedIn;
