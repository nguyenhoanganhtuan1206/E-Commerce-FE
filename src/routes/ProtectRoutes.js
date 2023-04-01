import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

const { Navigate, Outlet } = require("react-router-dom");

const ProtectRoutes = ({ redirectPath = "/", children }) => {
  const auth = useContext(AuthContext);

  if (!!auth.isLoggedIn) {
    return children ? children : <Outlet />;
  }

  return <Navigate to={redirectPath} replace />;
};

export default ProtectRoutes;
