import { memo } from "react";

import "./MyCart.scss";
import "./MyCartItem.scss";

import CartProductItem from "./CartProductItem";

const MyCartItem = (props) => {
  return (
    <div className="cart-user__item">
      <div className="cart-user__item-header">
        <p className="cart-user__item-text">
          Product owner:
          <span>Anh Tuan</span>
        </p>
      </div>

      <div className="cart-user__item-body">
        <CartProductItem />
      </div>
    </div>
  );
};

export default memo(MyCartItem);
