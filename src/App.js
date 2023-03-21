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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-ad" element={<PostAd />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard-user" element={<DashboardUserPage />} />
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/categories" element={<FilterProducts />} />
        <Route path="/chat-user" element={<ChatPageUser />} />
        <Route path="/my-ads" element={<MyAdsPage />} />
        <Route path="/my-cart" element={<MyCartPage />} />
        <Route path="/profile-user" element={<ProfileUserPage />} />
        <Route path="/seller-signUp" element={<SellerSignUpPage />} />

        <Route path="/admin" element={<DashboardAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
