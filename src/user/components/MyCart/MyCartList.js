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
    return Array.from(addCartToMap(fetchCartByCurrentUserId.data)).map(
      ([seller, carts]) => <MyCartGroupItems key={seller.id} carts={carts} />
    );
  }
};

export default memo(MyCartList);
