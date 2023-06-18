import { memo, useState } from "react";

import "./MyCart.scss";
import "./CartProductItem.scss";

import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { ButtonQuantity, ModalWarning } from "../../../shared/components";
import {
  useDecreaseQuantityMutation,
  useIncreaseQuantityMutation,
  useDeleteCartByIdMutation,
} from "../../../redux/apis/cart/cart.api";
import { ButtonFields } from "../../../shared/FormElement";

const CartProductItem = ({ cartItem }) => {
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [doIncreaseQuantity, doIncreaseQuantityResults] =
    useIncreaseQuantityMutation();
  const [doDecreaseQuantity, doDecreaseQuantityResults] =
    useDecreaseQuantityMutation();
  const [doDeleteCart] = useDeleteCartByIdMutation();

  const maxQuantity = cartItem.product.inventory
    ? cartItem.product.inventory.quantity
    : cartItem.product.quantity;

  const handleIncreaseQuantity = () => {
    if (cartItem.quantity === maxQuantity) {
      return;
    }

    doIncreaseQuantity(cartItem.id)
      .unwrap()
      .then()
      .catch((error) => toast.error(error.data.message));
  };

  const handleDecreaseQuantity = () => {
    if (cartItem.quantity === 1) {
      return;
    }

    doDecreaseQuantity(cartItem.id)
      .unwrap()
      .then()
      .catch((error) => toast.error(error.data.message));
  };

  const handleDeleteCart = () => {
    doDeleteCart(cartItem.id)
      .unwrap()
      .then(() => toast.success("Deleted this product successfully!"))
      .catch((error) => toast.error(error.data.message));
  };

  return (
    <div className="cart__item">
      <div className="cart__item-group">
        <div className="cart__item-box">
          <img
            className="cart__item-box__img"
            src="https://images.pexels.com/photos/5081971/pexels-photo-5081971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt={cartItem.product.name}
          />
        </div>

        <div className="cart__item-info">
          <p className="mycart-text__name">{cartItem.product.name}</p>

          <p className="mycart-text--light mycart-text--small">
            Category:
            {cartItem.product.categories.map((category, index) => (
              <span key={index} className="mycart-text--bold ml-2">
                {category.categoryName}
                {index + 1 !== cartItem.product.categories.length && ", "}
              </span>
            ))}
          </p>

          {cartItem.product.inventory ? (
            <p className="mycart-text--light mycart-text--small">
              Inventory:
              <span className="mycart-text--bold ml-2">
                {cartItem.product.inventory.colorValue},{" "}
                {cartItem.product.inventory.sizeValue}
              </span>
            </p>
          ) : (
            ""
          )}
        </div>
      </div>

      <ButtonQuantity
        currentQuantity={cartItem.quantity}
        maxQuantity={maxQuantity}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
        disabled={
          doIncreaseQuantityResults.isLoading ||
          doDecreaseQuantityResults.isLoading
        }
      />

      <p className="cart__product-item__text mycart-text--bold">{`$${cartItem.totalPrice.toFixed(
        2
      )}`}</p>
      <FontAwesomeIcon
        onClick={() => setIsShowModalDelete(true)}
        icon={faClose}
        className="cart__item-close"
      />

      {/* MODAL DELETE */}
      <ModalWarning
        show={isShowModalDelete}
        onCancel={() => setIsShowModalDelete(false)}
        headerWarning="Delete Your Cart"
        footer={
          <div className="d-flex align-items-center justify-content-between">
            <ButtonFields
              type="button"
              onClick={() => setIsShowModalDelete(false)}
              borderOnly
              className="seller-form__btn"
            >
              Close
            </ButtonFields>
            <ButtonFields
              onClick={handleDeleteCart}
              type="button"
              subPrimary
              className="seller-form__btn"
            >
              Confirm Delete
            </ButtonFields>
          </div>
        }
      >
        Are you sure you want to delete this product?
      </ModalWarning>
      {/* MODAL DELETE */}
    </div>
  );
};

export default memo(CartProductItem);
