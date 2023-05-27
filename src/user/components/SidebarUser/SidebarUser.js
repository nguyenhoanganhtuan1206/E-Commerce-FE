import "./SidebarUser.scss";

import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBookmark,
  faComment,
  faHome,
  faPlusCircle,
  faShoppingBasket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const SidebarUser = () => {
  return (
    <nav className="sidebar-user">
      <header className="sidebar-user__header">
        <img
          className="sidebar-user__avatar"
          src="https://demo.graygrids.com/themes/classigrids-demo/assets/images/dashboard/xuser-image.jpg.pagespeed.ic.YpFzrr6OVW.webp"
          alt="Avatar"
        />

        <div className="sidebar-user__info">
          <h3 className="sidebar-user__name">Steve Aldridge</h3>
          <span className="sidebar-user__email">@username</span>
        </div>
      </header>

      <ul className="sidebar-user__list">
        <li className="sidebar-user__item">
          <NavLink to="/dashboard-user" className="sidebar-user__link">
            <FontAwesomeIcon className="sidebar-user__icon" icon={faHome} />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li className="sidebar-user__item">
          <NavLink to="/profile-user" className="sidebar-user__link">
            <FontAwesomeIcon className="sidebar-user__icon" icon={faUser} />
            <span>Profile</span>
          </NavLink>
        </li>

        <li className="sidebar-user__item">
          <NavLink to="/product/new" className="sidebar-user__link">
            <FontAwesomeIcon
              className="sidebar-user__icon"
              icon={faPlusCircle}
            />
            <span>Post An Ad</span>
          </NavLink>
        </li>

        <li className="sidebar-user__item">
          <NavLink to="/my-ads" className="sidebar-user__link">
            <FontAwesomeIcon
              className="sidebar-user__icon"
              icon={faBagShopping}
            />
            <span>My Ads</span>
          </NavLink>
        </li>

        <li className="sidebar-user__item">
          <NavLink to="/my-cart" className="sidebar-user__link">
            <FontAwesomeIcon
              className="sidebar-user__icon"
              icon={faShoppingBasket}
            />
            <span>My Cart</span>
          </NavLink>
        </li>

        <li className="sidebar-user__item">
          <NavLink to="/" className="sidebar-user__link">
            <FontAwesomeIcon className="sidebar-user__icon" icon={faBookmark} />
            <span>Bookmarked</span>
          </NavLink>
        </li>

        <li className="sidebar-user__item">
          <NavLink to="/chat-user" className="sidebar-user__link">
            <FontAwesomeIcon className="sidebar-user__icon" icon={faComment} />
            <span>Chat</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarUser;
