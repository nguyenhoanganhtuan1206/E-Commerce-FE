import RoomChat from "./RoomChat";
import SidebarChatPage from "./SidebarChatPage";

const ChatPage = (props) => {
  return (
    <div className="chat-page">
      <div className="row wide">
        <div className="col-4">
          <SidebarChatPage />
        </div>

        <div className="col-8">
          <RoomChat />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
