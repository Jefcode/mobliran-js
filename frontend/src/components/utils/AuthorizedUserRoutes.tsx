import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../../features/auth/authSlice';

const AuthorizedUserRoutes = () => {
  const { user } = useSelector(authSelector);
  const isLoggedIn = !!user.token;

  if (!isLoggedIn) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
};

export default AuthorizedUserRoutes;
