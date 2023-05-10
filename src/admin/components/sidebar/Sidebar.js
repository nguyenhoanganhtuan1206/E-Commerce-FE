import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { Group } from "@mui/icons-material";

const Sidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar__top">
        <Link to="/admin" className="admin-sidebar__logo">
          Grid Admin
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

          <Link to="/admin/management-seller">
            <li className="admin-sidebar__center-item">
              <Group className="icon" />
              <span className="admin-sidebar__center-text">
                Management Sellers
              </span>
            </li>
          </Link>

          <li className="admin-sidebar__center-item">
            <PersonOutlineIcon className="icon" />
            <span className="admin-sidebar__center-text">Users</span>
          </li>

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
            <span className="admin-sidebar__center-text">Orders</span>
          </li>

          <li className="admin-sidebar__center-item">
            <LocalShippingIcon className="icon" />
            <span className="admin-sidebar__center-text">Delivery</span>
          </li>

          <p className="admin-sidebar__center-title">USEFUL</p>
          <li className="admin-sidebar__center-item">
            <InsertChartIcon className="icon" />
            <span className="admin-sidebar__center-text">Stats</span>
          </li>

          <li className="admin-sidebar__center-item">
            <NotificationsNoneIcon className="icon" />
            <span className="admin-sidebar__center-text">Notifications</span>
          </li>

          <p className="admin-sidebar__center-title">SERVICE</p>
          <li className="admin-sidebar__center-item">
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span className="admin-sidebar__center-text">System Health</span>
          </li>

          <li className="admin-sidebar__center-item">
            <PsychologyOutlinedIcon className="icon" />
            <span className="admin-sidebar__center-text">Logs</span>
          </li>

          <li className="admin-sidebar__center-item">
            <SettingsApplicationsIcon className="icon" />
            <span className="admin-sidebar__center-text">Settings</span>
          </li>

          <p className="admin-sidebar__center-title">USER</p>
          <li className="admin-sidebar__center-item">
            <AccountCircleOutlinedIcon className="icon" />
            <span className="admin-sidebar__center-text">Profile</span>
          </li>

          <li className="admin-sidebar__center-item">
            <ExitToAppIcon className="icon" />
            <span className="admin-sidebar__center-text">Logout</span>
          </li>
        </ul>
      </div>
      <div className="admin-sidebar__bottom">
        <div className="admin-sidebar__color-option"></div>
        <div className="admin-sidebar__color-option"></div>
        <div className="admin-sidebar__color-option"></div>
      </div>
    </div>
  );
};

export default Sidebar;
