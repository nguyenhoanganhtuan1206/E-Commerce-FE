import React from "react";

import classes from "./CartHeader.module.scss";

import { ButtonFields } from "../../../shared/FormElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useFetchCartByCurrentUserIdQuery } from "../../../redux/apis/cart/cart.api";

const CartHeader = () => {
  const fetchCartByCurrentUserId = useFetchCartByCurrentUserIdQuery();
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
                    <img
                      src="https://images.unsplash.com/photo-1683267894199-4d45c90b6c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                      alt="ac"
                      className={classes.CartImageProduct}
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
