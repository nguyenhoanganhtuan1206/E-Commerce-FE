import classes from "./CardText.module.scss";

const CardText = ({ className, style, children }) => {
  return (
    <span className={`${classes.CardText} ${className}`} style={style}>
      {children}
    </span>
  );
};

export default CardText;
