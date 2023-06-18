import classes from "./ButtonQuantity.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const ButtonQuantity = ({
  currentQuantity,
  maxQuantity = 1,
  onIncreaseQuantity,
  onDecreaseQuantity,
  disabled = false,
}) => {
  return (
    <div className={classes.ButtonQuantity}>
      <div
        className={`${classes.ButtonQuantityIcon} ${
          (disabled || currentQuantity === 1) &&
          classes.ButtonQuantity__Disabled
        } ${classes.ButtonQuantityIcon__Left}`}
        onClick={onDecreaseQuantity}
      >
        <FontAwesomeIcon icon={faMinus} />
      </div>

      <span className={classes.ButtonQuantityNumber}>{currentQuantity}</span>

      <div
        className={`${classes.ButtonQuantityIcon} ${
          (disabled || currentQuantity === maxQuantity) &&
          classes.ButtonQuantity__Disabled
        } ${classes.ButtonQuantityIcon__Right}`}
        onClick={onIncreaseQuantity}
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  );
};

export default ButtonQuantity;
