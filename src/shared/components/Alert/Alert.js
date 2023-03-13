import "./Alert.scss";

const Alert = ({ alertMessage, success, error }) => {
  const classes = `alert 
  ${success && "alert--success"}
  ${error && "alert--error"}`;

  return <div className={classes}>{alertMessage}</div>;
};

export default Alert;
