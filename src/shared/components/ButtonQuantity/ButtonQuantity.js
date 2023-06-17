import classes from "./ButtonQuantity.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const ButtonQuantity = ({
  currentQuantity,
  maxQuantity = 1,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  return (
    <div className={classes.ButtonQuantity}>
      <div
        className={`${classes.ButtonQuantityIcon} ${
          currentQuantity === 0 && classes.ButtonQuantity__Disabled
        } ${classes.ButtonQuantityIcon__Left}`}
      >
        <FontAwesomeIcon icon={faMinus} onClick={onDecreaseQuantity} />
      </div>

      <span className={classes.ButtonQuantityNumber}>{currentQuantity}</span>

      <div
        className={`${classes.ButtonQuantityIcon} ${
          currentQuantity === maxQuantity && classes.ButtonQuantity__Disabled
        } ${classes.ButtonQuantityIcon__Right}`}
      >
        <FontAwesomeIcon icon={faPlus} onClick={onIncreaseQuantity} />
      </div>
    </div>
  );
};

export default ButtonQuantity;
