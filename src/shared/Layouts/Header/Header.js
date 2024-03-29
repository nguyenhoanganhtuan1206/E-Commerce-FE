import "./Header.scss";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import { AvatarUser, PopperWrapper } from "../../components";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth-context";
import { CartHeader } from "../../../user/components";
import { LogoImage } from "../../../assets/image/exportImage";

const Header = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className="header">
      <div className="container">
        <div className="header__container">
          <Link to="/" className="header-logo__box">
            <img className="header-logo__photo" src={LogoImage} alt="logo" />
          </Link>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <Link
                  to="/"
                  className="header__nav-link header__nav-link--active"
                >
                  Home
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header__action">
            <ul className="header__action-list">
              {!authContext.isLoggedIn && (
                <>
                  <li className="header__action-item">
                    <Link to="/login">
                      <FontAwesomeIcon
                        className="header__icon"
                        icon={faArrowRightToBracket}
                      />
                      <span>Login</span>
                    </Link>
                  </li>

                  <li className="header__action-item">
                    <Link to="/register">
                      <FontAwesomeIcon className="header__icon" icon={faUser} />
                      <span>Register</span>
                    </Link>
                  </li>
                </>
              )}

              {authContext.isLoggedIn && (
                <>
                  <li className="header__action-item header__action-item--have-menu">
                    <AvatarUser circle />
                    <span className="header__action-item__name">
                      {authContext.username}
                    </span>

                    <div className="header__menu-user">
                      <PopperWrapper className="header__menu-user-popper">
                        <ul className="header__menu-user-list">
                          {authContext.roles.includes("ROLE_ADMIN") && (
                            <Link
                              to="/admin"
                              className="header__menu-user-item"
                            >
                              <FontAwesomeIcon
                                className="header__menu-user__icon"
                                icon={faUser}
                              />

                              <span>Admin Page</span>
                            </Link>
                          )}

                          {!authContext.roles.includes("ROLE_ADMIN") && (
                            <Link
                              to="/dashboard-user"
                              className="header__menu-user-item"
                            >
                              <FontAwesomeIcon
                                className="header__menu-user__icon"
                                icon={faUser}
                              />

                              <span>My Account</span>
                            </Link>
                          )}

                          {!authContext.roles.includes("ROLE_ADMIN") && (
                            <Link className="header__menu-user-item">
                              <FontAwesomeIcon
                                className="header__menu-user__icon"
                                icon={faCartShopping}
                              />
                              <span>My Order</span>
                            </Link>
                          )}

                          <li
                            onClick={authContext.logout}
                            className="header__menu-user-item"
                          >
                            <FontAwesomeIcon
                              className="header__menu-user__icon"
                              icon={faRightFromBracket}
                            />
                            <span>Log out</span>
                          </li>
                        </ul>
                      </PopperWrapper>
                    </div>
                  </li>

                  {!authContext.roles.includes("ROLE_ADMIN") && (
                    <li className="header__action-item header__cart">
                      <FontAwesomeIcon
                        className="header__cart-icon"
                        icon={faCartShopping}
                      />

                      <div className="header__cart-list">
                        <PopperWrapper
                          style={{ cursor: "default" }}
                          className="header__cart-popper"
                        >
                          <CartHeader />
                        </PopperWrapper>
                      </div>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
