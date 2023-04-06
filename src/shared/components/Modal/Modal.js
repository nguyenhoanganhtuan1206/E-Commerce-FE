import { memo } from "react";

import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";

import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";

const ModalOverlay = (props) => {
  const {
    className,
    headerClass,
    contentClass,
    footerClass,
    header,
    children,
    footer,
    onSubmit,
  } = props;

  const content = (
    <div className={`modal-alert ${className}`}>
      <header className={`modal-alert__header ${headerClass}`}>{header}</header>

      <form onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault()}>
        <div className={`modal-alert__content ${contentClass}`}>{children}</div>

        <div className={`modal-alert__footer ${footerClass}`}>{footer}</div>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}

      <CSSTransition
        in={props.show}
        timeout={400}
        classNames="modal-alert"
        mountOnEnter
        unmountOnExit
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default memo(Modal);
