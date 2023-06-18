import React from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import classes from "./CartHeader.module.scss";

import { Skeleton } from "../../../shared/components";
import { ButtonFields } from "../../../shared/FormElement";
import {
  useDeleteCartByIdMutation,
  useFetchCartByCurrentUserIdQuery,
} from "../../../redux/apis/cart/cart.api";
import CartImageProductHeader from "./CartImageProductHeader";

const CartHeader = () => {
  const fetchCartByCurrentUserId = useFetchCartByCurrentUserIdQuery();
  const [deleteCartById, deleteCartByIdResults] = useDeleteCartByIdMutation();

  const handleDeleteProduct = (cartId) => {
    deleteCartById(cartId)
      .unwrap()
      .then(() => toast.success("Removed this product from your cart"))
      .catch((error) => toast.error(error.data.message));
  };

  if (fetchCartByCurrentUserId.isFetching || deleteCartByIdResults.isLoading) {
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
                console.log("cartItem", cartItem);
                return (
                  <React.Fragment key={index}>
                    <div className={classes.CartItem}>
                      <CartImageProductHeader productId={cartItem.product.id} />

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
