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
      if (!currentCart.has(cartItem.seller.id)) {
        currentCart.set(cartItem.seller.id, []);
      }
      currentCart.get(cartItem.seller.id).push(cartItem);
    });
    return currentCart;
  };

  if (fetchCartByCurrentUserId.isLoading) {
    return <Skeleton times={6} style={{ height: "7rem", width: "100%" }} />;
  } else {
    if (fetchCartByCurrentUserId.data.size > 0) {
      return Array.from(addCartToMap(fetchCartByCurrentUserId.data)).map(
        ([sellerId, carts]) => (
          <MyCartGroupItems key={sellerId} sellerId={sellerId} carts={carts} />
        )
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
