import { AvatarUser } from "../../components";
import "./RoomChatHeader.scss";

const RoomChatHeader = (props) => {
  return (
    <div className="room-chat">
      <div className="room-chat__header">
        <div className="room-chat__user">
          <AvatarUser
            circle
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            className="room-chat__avatar"
          />

          <div className="room-chat__info">
            <h4 className="room-chat__name">Andri Thomas</h4>
            <div className="room-chat__user--active">
              <span></span>
              <p>Online</p>
            </div>
            {/* <span className="room-chat__user--un-active">Offline</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomChatHeader;
