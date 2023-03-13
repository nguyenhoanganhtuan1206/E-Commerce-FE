import "./RoomChat.scss";

import ChatInput from "./ChatInput";
import RoomChatHeader from "./RoomChatHeader";

const RoomChat = (props) => {
  return (
    <div className="room-chat">
      <RoomChatHeader />

      <div className="room-chat__detail">
        <div className="room-chat__message room-chat__message--other">
          <h4 className="room-chat__message-name">Andri Thomas</h4>

          <p className="room-chat__message-text">
            I want to make an appointment tomorrow from 2:00 to 5:00pm?
          </p>
          <span className="room-chat__message-time">1:55pm</span>
        </div>

        <div className="room-chat__message room-chat__message--own">
          <p className="room-chat__message-text">
            I want to make an appointment tomorrow from 2:00 to 5:00pm? I want
            to make an appointment tomorrow from 2:00 to 5:00pm? I want to make
            an appointment tomorrow from 2:00 to 5:00pm?
          </p>
          <span className="room-chat__message-time">1:55pm</span>
        </div>

        <div className="room-chat__message room-chat__message--own">
          <p className="room-chat__message-text">
            I want to make an appointment tomorrow from 2:00 to 5:00pm? I want
            to make an appointment tomorrow from 2:00 to 5:00pm? I want to make
            an appointment tomorrow from 2:00 to 5:00pm?
          </p>
          <span className="room-chat__message-time">1:55pm</span>
        </div>

        <div className="room-chat__message room-chat__message--other">
          <h4 className="room-chat__message-name">Andri Thomas</h4>
          <p className="room-chat__message-text">
            I want to make an appointment tomorrow from 2:00 to 5:00pm? I want
            to make an appointment tomorrow from 2:00 to 5:00pm? I want to make
            an appointment tomorrow from 2:00 to 5:00pm?
          </p>
          <span className="room-chat__message-time">1:55pm</span>
        </div>
      </div>

      <ChatInput />
    </div>
  );
};

export default RoomChat;
