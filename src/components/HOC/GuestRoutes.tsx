import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/storeHook";

const GuestRoutes = () => {
  const { user } = useAppSelector((state) => state.auth);

  return Boolean(!user) ? <Outlet /> : <Navigate to="/profile" />;
};

export default GuestRoutes;