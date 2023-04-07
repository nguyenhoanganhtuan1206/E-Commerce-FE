import { memo } from "react";

import {
  ChatBubbleOutline,
  DarkModeOutlined,
  FullscreenExitOutlined,
  ListOutlined,
  NotificationsNoneOutlined,
  SearchOutlined,
} from "@mui/icons-material";

import "./Navbar.scss";
import AvatarUser from "../../../shared/components/AvatarUser/AvatarUser";

const Navbar = () => {
  return (
    <div className="navbar-admin">
      <div className="navbar-admin__wrapper">
        <div className="navbar-admin__search">
          <input type="text" placeholder="Search..." autoComplete="none" />
          <SearchOutlined className="navbar-admin__icon" />
        </div>

        <div className="navbar-admin__list">
          <div className="navbar-admin__item">
            <DarkModeOutlined className="navbar-admin__icon" />
          </div>

          <div className="navbar-admin__item">
            <FullscreenExitOutlined className="navbar-admin__icon" />
          </div>

          <div className="navbar-admin__item">
            <NotificationsNoneOutlined className="navbar-admin__icon" />
            <span className="navbar-admin__counter">3</span>
          </div>

          <div className="navbar-admin__item">
            <ChatBubbleOutline className="navbar-admin__icon" />
            <span className="navbar-admin__counter">2</span>
          </div>

          <div className="navbar-admin__item">
            <ListOutlined className="navbar-admin__icon" />
          </div>

          <div className="navbar-admin__item">
            <AvatarUser circle className="navbar-admin__avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Navbar);
