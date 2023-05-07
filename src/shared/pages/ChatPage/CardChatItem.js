import "./CardChat.scss";

const CardChatItem = (props) => {
  return (
    <div className="card-chat">
      <div className="card-chat__avatar card-chat__avatar--active">
        <img
          className="card-chat__img"
          src="https://cdn.tailgrids.com/2.0/image/dashboard/images/chat-list/image-01.png"
          alt="Avatar"
        />
      </div>

      <div className="card-chat__detail">
        <h4 className="card-chat__name">Henry Dholi</h4>
        <p className="card-chat__message">
          Henry DholiHenry DholiHenry DholiHenry DholiHenry DholiHenry Dholi
        </p>
      </div>
    </div>
  );
};

export default CardChatItem;
