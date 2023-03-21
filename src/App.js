import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
} from "./user/page";
import { DashboardAdmin } from "./admin/page";
import { ProductDetail } from "./product/page";
import Login from "./user/components/auth/Login";
import Registration from "./user/components/auth/Registration";
import ProtectRoutes from "./routes/ProtectRoutes";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";

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

        {/* Routes logged in and all roles */}
        <Route element={<ProtectRoutes isAllowed={!!authContext.isLoggedIn} />}>
          <Route path="/dashboard-user" element={<DashboardUserPage />} />
          <Route path="/chat-user" element={<ChatPageUser />} />
          <Route path="/my-ads" element={<MyAdsPage />} />
          <Route path="/my-cart" element={<MyCartPage />} />
          <Route path="/profile-user" element={<ProfileUserPage />} />
          <Route path="/seller-signUp" element={<SellerSignUpPage />} />
        </Route>
        {/* Routes logged in and all roles */}

        {/* Routes logged in and just role SELLER */}
        <Route
          element={
            <ProtectRoutes
              isAllowed={
                !!authContext.isLoggedIn &&
                authContext.roles.include("ROLE_SELLER")
              }
            />
          }
        >
          <Route path="/post-ad" element={<PostAd />} />
        </Route>
        {/* Routes logged in and just role SELLER */}

        {/* Routes required Admin */}
        <Route path="/admin" element={<DashboardAdmin />} />
        {/* Routes required Admin */}
      </Routes>
    </Router>
  );
}

export default App;
