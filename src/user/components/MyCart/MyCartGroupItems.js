import { memo } from "react";

import "./MyCart.scss";
import "./MyCartGroupItems.scss";

import CartProductItem from "./CartProductItem";
import ButtonFields from "../../../shared/FormElement/ButtonFields/ButtonFields";

const MyCartGroupItems = ({ carts = [] }) => {
  return (
    <div className="mycart__group">
      <div className="mycart__group-header">
        <p className="mycart-text--bold m-0">
          Product Owner:
          <span className="mycart-text--bold ml-3">
            {carts[0].seller.sellerName}
          </span>
        </p>
      </div>

      <div className="mycart__group-items-list">
        {carts.map((cartItem, index) => {
          return <CartProductItem key={index} cartItem={cartItem} />;
        })}
      </div>

      <div className="mycart__group-footer">
        <ButtonFields className="mycart__payment-btn">
          Order Payment
        </ButtonFields>

        <p className="mycart__group-total-price">
          Total Price:
          <span>
            {`$${carts
              .reduce((total, item) => total + item.totalPrice, 0)
              .toFixed(2)}`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default memo(MyCartGroupItems);
