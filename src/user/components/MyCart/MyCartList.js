import { memo } from "react";

import "./MyCart.scss";

import MyCartGroupItems from "./MyCartGroupItems";
import { useFetchCartByCurrentUserIdQuery } from "../../../redux/apis/cart/cart.api";
import { Skeleton } from "../../../shared/components";

const MyCartList = () => {
  const fetchCartByCurrentUserId = useFetchCartByCurrentUserIdQuery();

  if (fetchCartByCurrentUserId.isFetching) {
    return <Skeleton times={6} style={{ height: "7rem", width: "100%" }} />;
  } else {
    fetchCartByCurrentUserId.data.map((cartItem) => {
      console.log("cartItem", cartItem);
      return (
        <>
          <MyCartGroupItems />
          <MyCartGroupItems />
        </>
      );
    });
  }
};

export default memo(MyCartList);
