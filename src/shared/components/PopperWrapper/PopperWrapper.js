import "./PopperWrapper.scss";

const PopperWrapper = (props) => {
  return (
    <div style={props.style} className={`popper-wrapper ${props.className}`}>
      {props.children}
    </div>
  );
};

export default PopperWrapper;
