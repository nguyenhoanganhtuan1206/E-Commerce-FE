import { Link } from "react-router-dom";

import classes from "./CartHeader.module.scss";

import { ProductImageDisplay, Skeleton } from "../../../shared/components";
import { ButtonFields } from "../../../shared/FormElement";
import { useFetchCartByCurrentUserIdQuery } from "../../../redux/apis/cart/cart.api";
import { Fragment } from "react";

const CartHeader = () => {
  const fetchCartByCurrentUserId = useFetchCartByCurrentUserIdQuery();

  const filterInventory = (inventories = [], inventoryId = null) => {
    return inventories.filter((item) => item.id === inventoryId);
  };

  let isHaveInventory = false;
  const displayCartDetail = () => {
    return fetchCartByCurrentUserId.data.map((cartItem, index) => {
      if (cartItem.cartProductInventory.inventoryId) {
        isHaveInventory = true;
      }

      return (
        <Fragment key={index}>
          <div className={classes.CartItem}>
            <ProductImageDisplay
              productId={cartItem.product.id}
              className={classes.CartImageProductHeader}
            />

            <div className={classes.CartInfo}>
              <Link className={classes.CartName}>{cartItem.product.name}</Link>

              {isHaveInventory && (
                <p className={classes.CartInfoText}>
                  {filterInventory(
                    cartItem.product.inventories,
                    cartItem.cartProductInventory.inventoryId
                  ).map((inventoryItem, index) => (
                    <Fragment key={index}>
                      {inventoryItem.colorValue}, {inventoryItem.sizeValue} x
                      {` $${inventoryItem.price.toFixed(2)}`}
                    </Fragment>
                  ))}
                </p>
              )}

              {!isHaveInventory && (
                <p className={classes.CartInfoText}>
                  {cartItem.quantity} x{" "}
                  {`$${cartItem.product.price.toFixed(2)}`}
                </p>
              )}
            </div>
          </div>
        </Fragment>
      );
    });
  };

  if (fetchCartByCurrentUserId.isFetching) {
    return <Skeleton times={3} height="4rem" />;
  } else if (
    !fetchCartByCurrentUserId.data ||
    fetchCartByCurrentUserId.data.length === 0
  ) {
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

            <div className={classes.CartList}>{displayCartDetail()}</div>

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
