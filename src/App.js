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
  SellerSignUpPage,
  ConfirmEmailPage,
  ResetPasswordPage,
} from "./user/page";
import { DashboardAdmin } from "./admin/page";
import { ProductDetail } from "./product/page";
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

        <Route path="/post-ad" element={<PostAd />} />

        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Routes logged in and all roles */}
        <Route element={<ProtectRoutes isAllowed={!!authContext.isLoggedIn} />}>
          <Route path="/dashboard-user" element={<DashboardUserPage />} />
          <Route path="/chat-user" element={<ChatPageUser />} />
          <Route path="/my-ads" element={<MyAdsPage />} />
          <Route path="/my-cart" element={<MyCartPage />} />
          <Route path="/profile-user" element={<ProfileUserPage />} />
          <Route path="/registration-sell" element={<SellerSignUpPage />} />
          {/* <Route path="/post-ad" element={<PostAd />} /> */}
        </Route>
        {/* Routes logged in and all roles */}

        {/* Routes required Admin */}
        <Route path="/admin" element={<DashboardAdmin />} />
        {/* Routes required Admin */}
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
