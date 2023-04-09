import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";

import { Home } from "./shared/components";
import {
  DashboardUserPage,
  PostAd,
  ChatPageUser,
  FilterProducts,
  MyAdsPage,
  MyCartPage,
  ProfileUserPage,
  ConfirmEmailPage,
  ResetPasswordPage,
  SellerSignUpDetailPage,
} from "./user/page";
import { AdminHome, ManagementSellerPage } from "./admin/pages/";
import { ProductDetail } from "./product/page";
import { ErrorPage } from "./shared/pages";
import Login from "./user/components/auth/Login";
import Registration from "./user/components/auth/Registration";
import ProtectRoutes from "./routes/ProtectRoutes";

function App() {
  const authContext = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* Routes permit all */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/categories" element={<FilterProducts />} />
        {/* Routes permit all */}
        <Route
          path="/reset-password/confirm-email"
          element={<ConfirmEmailPage />}
        />
        {/* Required token */}
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        {/* Required token */}
        {/* Routes logged in and all roles */}
        <Route element={<ProtectRoutes isAllowed={authContext.isLoggedIn} />}>
          <Route path="/dashboard-user" element={<DashboardUserPage />} />
          <Route path="/chat-user" element={<ChatPageUser />} />
          <Route path="/my-ads" element={<MyAdsPage />} />
          <Route path="/my-cart" element={<MyCartPage />} />
          <Route path="/profile-user" element={<ProfileUserPage />} />
          <Route path="/post-ad" element={<PostAd />} />
          <Route
            path="/registration-seller"
            element={<SellerSignUpDetailPage />}
          />
        </Route>
        {/* Routes logged in and all roles */}
        {/* Routes required Admin */}
        <Route
          element={
            <ProtectRoutes
              isAllowed={
                authContext.isLoggedIn &&
                authContext.roles.includes("ROLE_ADMIN")
              }
            />
          }
        >
          <Route path="/admin" element={<AdminHome />} />
          <Route
            path="/admin/management-seller"
            element={<ManagementSellerPage />}
          />
        </Route>

        {/* Routes required Admin */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        icon
        className="toast__modify"
      />
    </Router>
  );
}

export default App;
