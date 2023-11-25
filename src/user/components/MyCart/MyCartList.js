import { memo } from "react";

import "./MyCart.scss";

import MyCartGroupItems from "./MyCartGroupItems";
import { useFetchCartByCurrentUserIdQuery } from "../../../redux/apis/cart/cart.api";
import { Skeleton } from "../../../shared/components";

const MyCartList = () => {
  const fetchCartByCurrentUserId = useFetchCartByCurrentUserIdQuery();

  const addCartToMap = (carts = []) => {
    const currentCart = new Map();

    carts.forEach((cartItem) => {
      if (!currentCart.has(cartItem.id)) {
        currentCart.set(cartItem.id, []);
      }
      currentCart.get(cartItem.id).push(cartItem);
    });
    return currentCart;
  };

  if (fetchCartByCurrentUserId.isLoading) {
    return <Skeleton times={6} style={{ height: "7rem", width: "100%" }} />;
  } else {
    if (fetchCartByCurrentUserId.data.length > 0) {
      return Array.from(addCartToMap(fetchCartByCurrentUserId.data)).map(
        ([sellerId, carts]) => {
          console.log("sellerId", sellerId);
          return (
            <MyCartGroupItems
              key={sellerId}
              sellerInfo={carts[0].seller}
              carts={carts}
            />
          );
        }
      );
    }

    return (
      <p className="m-0" style={{ textAlign: "center", fontSize: "1.4rem" }}>
        Your cart is empty
      </p>
    );
  }
};

export default memo(MyCartList);
