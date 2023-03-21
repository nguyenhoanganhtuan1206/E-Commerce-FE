import "./ButtonFields.scss";

import { Link } from "react-router-dom";

const ButtonFields = (props) => {
  const {
    to,
    href,
    type,
    primary,
    loading,
    borderOnly,
    fullWidth,
    className,
    onClick,
    children,
    disabled,
  } = props;

  const classes = `btn 
  ${className}
  ${primary && "btn--primary"}
  ${fullWidth && "btn--fullWidth"}
  ${borderOnly && "btn--borderOnly"}
  ${disabled && "btn--disabled"} 
`;

  if (to) {
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {props.children}
      <span className={`${loading && "btn--loading"}`}></span>
    </button>
  );
};

export default ButtonFields;
