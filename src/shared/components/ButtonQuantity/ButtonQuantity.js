import classes from "./ButtonQuantity.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const ButtonQuantity = ({ quantity = 0 }) => {
  return (
    <div className={classes.ButtonQuantity}>
      <div className={`${classes.ButtonQuantityIcon} ${classes.ButtonQuantityIcon__Left}`}>
        <FontAwesomeIcon icon={faMinus} />
      </div>

      <span className={classes.ButtonQuantityNumber}>{quantity}</span>

      <div className={`${classes.ButtonQuantityIcon} ${classes.ButtonQuantityIcon__Right}`}> 
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  );
};

export default ButtonQuantity;
