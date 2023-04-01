import { memo } from "react";
import ReactDOM from "react-dom";

import './Backdrop.scss';

const Backdrop = ({ onClick }) => {
  const content = <div className="backdrop" onClick={onClick}></div>;

  return ReactDOM.createPortal(
    content,
    document.getElementById("backdrop-hook")
  );
};

export default memo(Backdrop);
