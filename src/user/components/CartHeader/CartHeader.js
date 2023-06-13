import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import classes from "./CartHeader.module.scss";

import { ButtonFields } from "../../../shared/FormElement";
import {
  useDeleteCartByIdMutation,
  useFetchCartByCurrentUserIdQuery,
} from "../../../redux/apis/cart/cart.api";
import CartImageProductHeader from "./CartImageProductHeader";
import { toast } from "react-toastify";

const CartHeader = () => {
  const fetchCartByCurrentUserId = useFetchCartByCurrentUserIdQuery();
  const [deleteCartById, deleteCartByIdResults] = useDeleteCartByIdMutation();

  const handleDeleteProduct = (cartId) => {
    deleteCartById(cartId)
      .unwrap()
      .then(() => toast.success("Removed this product from your cart"))
      .catch((error) => toast.error(error.data.message));
  };

  return (
    <>
      {fetchCartByCurrentUserId.data && (
        <>
          <header className={classes.Header}>
            <p className={classes.HeaderText}>
              {fetchCartByCurrentUserId.data
                ? fetchCartByCurrentUserId.data.length
                : 0}{" "}
              Items
            </p>

            <p className={classes.HeaderText}>View Cart</p>
          </header>

          <div className={classes.CartList}>
            {fetchCartByCurrentUserId.data.map((cartItem, index) => {
              return (
                <React.Fragment key={index}>
                  <div className={classes.CartItem}>
                    <CartImageProductHeader
                      productId={cartItem.inventory.product.id}
                    />

                    <div className={classes.CartInfo}>
                      <Link className={classes.CartName}>
                        {cartItem.inventory.product.name}
                      </Link>

                      <p className={classes.CartInfoText}>
                        {cartItem.inventory.colorValue},{" "}
                        {cartItem.inventory.sizeValue}
                      </p>

                      <p className={classes.CartInfoText}>
                        {cartItem.quantity} x{" "}
                        {`$${cartItem.inventory.price.toFixed(2)}`}
                      </p>
                    </div>

                    <FontAwesomeIcon
                      onClick={() => handleDeleteProduct(cartItem.id)}
                      className={classes.CartIcon}
                      icon={faClose}
                    />
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          <div className={classes.CartBottom}>
            <div className={classes.CartTotal}>
              <span>Total</span>

              <p>
                {`$${fetchCartByCurrentUserId.data
                  .reduce((total, item) => total + item.totalPrice, 0)
                  .toFixed(2)}`}
              </p>
            </div>
          </div>

          <ButtonFields primary>Checkout</ButtonFields>
        </>
      )}
    </>
  );
};

export default CartHeader;
