import "./SidebarChat.scss";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CardChat from "./CardChat";

const SidebarChatPage = (props) => {
  return (
    <div className="sidebar-chat">
      <div className="sidebar-chat__header">
        Active Conversations
        <span className="sidebar-chat__quantity">7</span>
      </div>

      <form className="sidebar-chat__search">
        <div className="sidebar-chat__search-group">
          <input
            type="text"
            placeholder="Search..."
            className="sidebar-chat__input"
          />

          <FontAwesomeIcon
            className="sidebar-chat__search-icon"
            icon={faMagnifyingGlass}
          />
        </div>
      </form>

      <CardChat />
      <CardChat />
      <CardChat />
      <CardChat />
      <CardChat />
      <CardChat />
      <CardChat />
      <CardChat />
      <CardChat />
    </div>
  );
};

export default SidebarChatPage;
