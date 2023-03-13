import { memo } from "react";

import "./MyCart.scss";
import "./CartProductItem.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const CartProductItem = ({
  image,
  name = "Image Product",
  category,
  price,
  quantity,
}) => {
  return (
    <div className="cart__item">
      <div className="cart__item-group">
        <div className="cart__item-box">
          <img
            className="cart__item-box__img"
            src="https://images.pexels.com/photos/5081971/pexels-photo-5081971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt={name}
          />
        </div>

        <div className="cart__item-info">
          <p className="mycart-text__name">
            Surface Laptop StudioSurface Laptop StudioSurface Laptop
            StudiotudioSurface Laptop StudiotudioSurface Laptop Studio
          </p>

          <p className="mycart-text--light mycart-text--small">
            Category:
            <span className="mycart-text--bold ml-2">Screen</span>
          </p>

          <p className="mycart-text--light mycart-text--small">
            Status:
            <span className="mycart-text--bold ml-2">New</span>
          </p>
        </div>
      </div>

      <div className="cart__item-edit-quantity">
        <FontAwesomeIcon
          icon={faMinus}
          className="cart__item-edit-quantity__icon cart__item-edit-quantity__icon--disabled"
        />
        <span className="mycart-text--small">1</span>
        <FontAwesomeIcon
          icon={faPlus}
          className="cart__item-edit-quantity__icon"
        />
      </div>

      <p className="mycart-text--bold">$493.0</p>
      <FontAwesomeIcon icon={faClose} className="cart__item-close" />
    </div>
  );
};

export default memo(CartProductItem);
