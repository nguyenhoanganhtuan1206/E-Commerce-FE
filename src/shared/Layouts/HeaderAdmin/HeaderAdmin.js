import "./HeaderAdmin.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { PopperWrapper, AvatarUser } from "../../components";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const HeaderAdmin = () => {
  return (
    <header className="header-admin">
      <div className="header-admin__notifications">
        <FontAwesomeIcon
          icon={faBell}
          className="header-admin__notifications-icon"
        />

        <FontAwesomeIcon
          icon={faBell}
          className="header-admin__notifications-icon"
        />
      </div>

      <div className="header-admin__info">
        <h3 className="header-admin__info-detail">Thomas Anree</h3>
        <AvatarUser
          circle
          src="https://images.pexels.com/photos/5774802/pexels-photo-5774802.jpeg?auto=compress&cs=tinysrgb&w=1600"
          className="header-admin__info-avatar"
        />

        {/* SUB MENU */}
        <PopperWrapper className="header-admin__popper-wrapper">
          <ul className="header-admin__info-list">
            <li className="header-admin__info-item">
              <FontAwesomeIcon icon={faUser} />
              <span>My Profile</span>
            </li>

            <li className="header-admin__info-item">
              <FontAwesomeIcon icon={faUser} />
              <span>My Profile</span>
            </li>

            <li className="header-admin__info-item">
              <FontAwesomeIcon icon={faUser} />
              <span>My Profile</span>
            </li>

            <li className="header-admin__info-item">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <span>Logout</span>
            </li>
          </ul>
        </PopperWrapper>
        {/*SUB MENU */}
      </div>
    </header>
  );
};

export default HeaderAdmin;
