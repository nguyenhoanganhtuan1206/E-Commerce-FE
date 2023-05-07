import "./SidebarChat.scss";

import { useState } from "react";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { db } from "../../../config/firebaseConfig";
import CardChat from "./CardChatItem";
import CardChatList from "./CardChatList";

const SidebarChatPage = (props) => {
  const [userSearchResult, setUserSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchUsers = async () => {
    const q = query(
      collection(db, "users"),
      where("username", "==", userSearchResult)
    );

    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  const handleEnterSearch = (e) => {
    e.code === "Enter" && handleSearchUsers();
  };

  return (
    <div className="sidebar-chat">
      <div className="sidebar-chat__header">
        Active Conversations
        <span className="sidebar-chat__quantity">7</span>
      </div>

      <div className="sidebar-chat__search">
        <div className="sidebar-chat__search-group">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleEnterSearch}
            type="text"
            placeholder="Search..."
            className="sidebar-chat__input"
          />

          <FontAwesomeIcon
            className="sidebar-chat__search-icon"
            icon={faMagnifyingGlass}
          />
        </div>
      </div>

      <CardChatList />
    </div>
  );
};

export default SidebarChatPage;
