import "./Header.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { AvatarUser, PopperWrapper } from "../../components";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth-context";

const Header = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className="header">
      <div className="container">
        <div className="header__container">
          <Link to="/" className="header-logo__box">
            <img
              className="header-logo__photo"
              src="https://demo.graygrids.com/themes/classigrids-demo/assets/images/logo/logo.svg"
              alt="logo"
            />
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

              <li className="header__nav-item">
                <Link to="/categories" className="header__nav-link">
                  Categories
                </Link>
              </li>

              <li className="header__nav-item">
                <Link href="#" className="header__nav-link">
                  Categories
                </Link>
              </li>

              <li className="header__nav-item">
                <Link to="/" href="#" className="header__nav-link">
                  Pages
                </Link>
              </li>

              <li className="header__nav-item">
                <Link to="/" href="#" className="header__nav-link">
                  Blog
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
                <li className="header__action-item header__action-item--have-menu">
                  <AvatarUser circle />
                  <span>Nguyen Hoang Anh Tuan</span>

                  <div className="header__menu-user">
                    <PopperWrapper className="header__menu-user-popper">
                      <ul className="header__menu-user-list">
                        <Link
                          to="/dashboard-user"
                          className="header__menu-user-item"
                        >
                          <FontAwesomeIcon icon={faUser} />

                          <span>My Account</span>
                        </Link>

                        <Link className="header__menu-user-item">
                          <FontAwesomeIcon icon={faCartShopping} />
                          <span>My Order</span>
                        </Link>

                        <Link className="header__menu-user-item">
                          <FontAwesomeIcon icon={faRightFromBracket} />
                          <span>Log out</span>
                        </Link>
                      </ul>
                    </PopperWrapper>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
