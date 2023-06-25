import React from "react";
import { Link } from "react-router-dom";

import classes from "./CartHeader.module.scss";

import { ProductImageDisplay, Skeleton } from "../../../shared/components";
import { ButtonFields } from "../../../shared/FormElement";
import { useFetchCartByCurrentUserIdQuery } from "../../../redux/apis/cart/cart.api";

const CartHeader = () => {
  const fetchCartByCurrentUserId = useFetchCartByCurrentUserIdQuery();

  if (fetchCartByCurrentUserId.isFetching) {
    return <Skeleton times={3} height="4rem" />;
  } else if (fetchCartByCurrentUserId.data.length === 0) {
    return (
      <p className={`${classes.HeaderText} text-center`}>Your cart is empty</p>
    );
  } else {
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
                      <ProductImageDisplay
                        productId={cartItem.product.id}
                        className={classes.CartImageProductHeader}
                      />

                      <div className={classes.CartInfo}>
                        <Link className={classes.CartName}>
                          {cartItem.product.name}
                        </Link>

                        {cartItem.product.inventory && (
                          <p className={classes.CartInfoText}>
                            {cartItem.product.inventory.colorValue},{" "}
                            {cartItem.product.inventory.sizeValue}
                          </p>
                        )}

                        <p className={classes.CartInfoText}>
                          {cartItem.quantity} x{" "}
                          {cartItem.product.inventory
                            ? `$${cartItem.product.inventory.price.toFixed(2)}`
                            : `$${cartItem.product.price.toFixed(2)}`}
                        </p>
                      </div>
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

            <ButtonFields to="/my-cart" primary>
              Checkout
            </ButtonFields>
          </>
        )}
      </>
    );
  }
};

export default CartHeader;
