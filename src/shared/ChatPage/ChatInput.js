import "./ChatInput.scss";

import { faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatInput = (props) => {
  return (
    <form className="room-chat__form">
      <div className="room-chat__form-group">
        <input
          placeholder="Type something here..."
          className="room-chat__form-input"
        />

        <FontAwesomeIcon className="room-chat__form-icon" icon={faPaperclip} />
      </div>

      <button type="submit" className="room-chat__form-submit">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
};

export default ChatInput;
