import classes from "./ButtonQuantity.module.scss";

import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import {
  setQuantity,
  toggleDecreaseQuantity,
  toggleIncreaseQuantity,
} from "../../../redux/slices/cart/cartSlice";
import { useEffect } from "react";

const ButtonQuantity = ({ maxQuantity = 0 }) => {
  const dispatch = useDispatch();
  const inventoryDetailState = useSelector((state) => state.inventoryDetail);
  const cartQuantityState = useSelector((state) => state.cartSlice);

  useEffect(() => {
    if (
      inventoryDetailState.inventoryDetailData &&
      cartQuantityState.quantity > maxQuantity
    ) {
      dispatch(setQuantity(inventoryDetailState.inventoryDetailData.quantity));
      return;
    }

    //! TODO: fetch with quantity product without inventory
  }, [
    cartQuantityState.quantity,
    dispatch,
    inventoryDetailState.inventoryDetailData,
    maxQuantity,
  ]);

  const handleDecreaseQuantity = () => {
    if (cartQuantityState.quantity === 1) {
      return;
    }

    dispatch(toggleDecreaseQuantity());
  };

  const handleIncreaseQuantity = () => {
    if (cartQuantityState.quantity === maxQuantity) {
      return;
    }

    dispatch(toggleIncreaseQuantity());
  };

  return (
    <div className={classes.ButtonQuantity}>
      <div
        className={`${classes.ButtonQuantityIcon} ${
          cartQuantityState.quantity === 0 && classes.ButtonQuantity__Disabled
        } ${classes.ButtonQuantityIcon__Left}`}
      >
        <FontAwesomeIcon icon={faMinus} onClick={handleDecreaseQuantity} />
      </div>

      <span className={classes.ButtonQuantityNumber}>
        {cartQuantityState.quantity}
      </span>

      <div
        className={`${classes.ButtonQuantityIcon} ${
          cartQuantityState.quantity === maxQuantity &&
          classes.ButtonQuantity__Disabled
        } ${classes.ButtonQuantityIcon__Right}`}
      >
        <FontAwesomeIcon icon={faPlus} onClick={handleIncreaseQuantity} />
      </div>
    </div>
  );
};

export default ButtonQuantity;
