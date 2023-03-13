import "./PopperWrapper.scss";

const PopperWrapper = (props) => {
  return (
    <div className={`popper-wrapper ${props.className}`}>{props.children}</div>
  );
};

export default PopperWrapper;
