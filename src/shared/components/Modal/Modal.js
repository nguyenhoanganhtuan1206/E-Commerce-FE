import { memo } from "react";
import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  const {
    show,
    onCancel,
    className,
    headerClass,
    contentClass,
    footerClass,
    header,
    children,
    footer,
    onSubmit,
  } = props;

  const classes = `modal-alert ${className}
  ${show && "active"}`;

  return (
    <>
      {props.show && <Backdrop onClick={onCancel} />}

      <div className={`${classes}`}>
        <header className={`modal-alert__header ${headerClass}`}>
          {header}
        </header>

        <form onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault()}>
          <div className={`modal-alert__content ${contentClass}`}>
            {children}
          </div>

          <div className={`modal-alert__footer ${footerClass}`}>{footer}</div>
        </form>
      </div>
    </>
  );
};

export default memo(Modal);
