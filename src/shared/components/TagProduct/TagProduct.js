import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./TagProduct.module.scss";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const TagProduct = ({
  name,
  onClick,
  className,
  style,
  extraInformation,
  disabled = false,
  isActive = false,
}) => {
  return (
    <div
      style={style}
      className={`${classes.TagProduct} 
      ${disabled && classes.TagProductDisabled} 
      ${isActive && classes.TagProductIsActive}
      ${className}`}
      onClick={onClick}
    >
      <span className={classes.TagProduct__Name}>
        {name}
        <FontAwesomeIcon
          className={`${isActive && classes.TagProductCheckedIcon__Active} ${
            classes.TagProductCheckedIcon
          }`}
          icon={faCheck}
        />
      </span>

      {extraInformation && (
        <div className={classes.TagProduct__ExtraInformation}>
          {extraInformation}
        </div>
      )}
    </div>
  );
};

export default TagProduct;
