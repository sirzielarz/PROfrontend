import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth, { User } from "../apix/useAuth";

export interface RequireAuthProps {
  allowedRoles: User["roles"];
}
const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const auth = useAuth();
  const location = useLocation();

  return auth?.user?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
