import {
  Navigate,
  Outlet,
  useLocation,
  useOutletContext,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { authSelector } from '../../features/auth/authSlice';

type ContextType = { redirect: string };

const UnauthorizedUserRoutes = () => {
  const location = useLocation();
  const { user } = useSelector(authSelector);
  const isLoggedIn = !!user.token;

  // Get the redirect path from search query
  const search = new URLSearchParams(location.search);
  const redirect: string = search.get('redirect') ?? '/';

  if (isLoggedIn) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet context={{ redirect }} />;
};

export default UnauthorizedUserRoutes;

export function useUnauthorizedRoutes() {
  return useOutletContext<ContextType>();
}
