import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const SidebarSeller = () => {
  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar__top">
        <Link to="/" className="admin-sidebar__logo">
          Channel Seller
        </Link>
      </div>
      <div className="admin-sidebar__center">
        <ul>
          <p className="admin-sidebar__center-title">MAIN</p>

          <Link to="/admin">
            <li className="admin-sidebar__center-item">
              <DashboardIcon className="icon" />
              <span className="admin-sidebar__center-text">Dashboard</span>
            </li>
          </Link>

          <Link to="/admin/management-products">
            <li className="admin-sidebar__center-item">
              <StoreIcon className="icon" />
              <span className="admin-sidebar__center-text">
                Management Products
              </span>
            </li>
          </Link>

          <li className="admin-sidebar__center-item">
            <CreditCardIcon className="icon" />
            <span className="admin-sidebar__center-text">
              Management Orders
            </span>
          </li>

          <li className="admin-sidebar__center-item">
            <LocalShippingIcon className="icon" />
            <span className="admin-sidebar__center-text">Delivery</span>
          </li>

          <p className="admin-sidebar__center-title">USEFUL</p>
          <li className="admin-sidebar__center-item">
            <NotificationsNoneIcon className="icon" />
            <span className="admin-sidebar__center-text">Notifications</span>
          </li>
        </ul>
      </div>    
    </div>
  );
};

export default SidebarSeller;
