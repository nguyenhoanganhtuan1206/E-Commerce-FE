import { Breadcrumbs } from "../../../shared/components";
import { Header } from "../../../shared/Layouts";
import ChatPage from "../../../shared/pages/ChatPage/ChatPage";
import { MainComponentUser } from "../../components";

const ChatPageUser = (props) => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* BreadCrumbs */}
      <Breadcrumbs title="Messages" nextPages={["Home"]} />
      {/* BreadCrumbs */}

      <MainComponentUser>
        <div className="main-content--user">
          <h3 className="main-content--user__header">Messages</h3>

          <div className="main-content--user__body chat-page">
            <ChatPage />
          </div>
        </div>
      </MainComponentUser>
    </>
  );
};

export default ChatPageUser;
