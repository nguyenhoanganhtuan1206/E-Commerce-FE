import { memo } from "react";

import "./MyCart.scss";
import "./MyCartGroupItems.scss";

import CartProductItem from "./CartProductItem";
import ButtonFields from "../../../shared/FormElement/ButtonFields/ButtonFields";

const MyCartGroupItems = (props) => {
  return (
    <div className="mycart__group">
      <div className="mycart__group-header">
        <span className="mycart-text--bold">
          Product Owner:
          <span className="mycart-text--bold ml-3">ANH TUAN</span>
        </span>
      </div>

      <div className="mycart__group-items-list">
        <CartProductItem />
        <CartProductItem />
        <CartProductItem />
      </div>

      <div className="mycart__group-footer">
        <ButtonFields className="mycart__payment-btn">
          Order Payment
        </ButtonFields>

        <p className="mycart__group-total-price">
          Total Price:
          <span>$904</span>
        </p>
      </div>
    </div>
  );
};

export default memo(MyCartGroupItems);
