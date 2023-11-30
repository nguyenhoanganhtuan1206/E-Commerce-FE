import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  useFetchOrdersCompletedQuery,
  useFetchOrdersQuery,
  useFetchOrdersWaitingPaymentQuery,
} from "../../../redux/apis/user/orders/my-orders.api";

import { Skeleton } from "../../../shared/components";
import { ErrorPage } from "../../../shared/pages";
import MyOrderGroupItems from "./MyOrderGroupItems";
import {
  MY_ORDER_TABS,
  fetchNumberAllOrders,
  fetchNumberCompleted,
  fetchNumbersWaitingPayment,
} from "../../../redux/slices/user/myOrders/myOrdersSlices";

const MyOrderList = () => {
  const fetchOrders = useFetchOrdersQuery();
  const fetchOrdersCompleted = useFetchOrdersCompletedQuery();
  const fetchOrdersWaitingPayment = useFetchOrdersWaitingPaymentQuery();

  const dispatch = useDispatch();
  const myOrdersState = useSelector((state) => state.myOrderSlices);

  const [data, setData] = useState([]);

  let isFetchingData = false;
  const handleFetchDataBySection = () => {
    dispatch(
      fetchNumberAllOrders(fetchOrders.data ? fetchOrders.data.length : 0)
    );
    dispatch(
      fetchNumberCompleted(
        fetchOrdersCompleted.data ? fetchOrdersCompleted.data.length : 0
      )
    );
    dispatch(
      fetchNumbersWaitingPayment(
        fetchOrdersWaitingPayment.data
          ? fetchOrdersWaitingPayment.data.length
          : 0
      )
    );

    switch (myOrdersState.myCurrentTab) {
      case MY_ORDER_TABS.ALL_ORDERS:
        isFetchingData = fetchOrders.isFetching;

        return fetchOrders.data;

      case MY_ORDER_TABS.COMPLETED:
        isFetchingData = fetchNumberCompleted.isFetching;

        return fetchOrdersCompleted.data;

      case MY_ORDER_TABS.WAITING_FOR_PAYMENT:
        isFetchingData = fetchOrdersWaitingPayment.isFetching;

        return fetchOrdersWaitingPayment.data;

      default:
        isFetchingData = fetchOrders.isFetching;

        return fetchOrders.data;
    }
  };

  useEffect(() => {
    setData(handleFetchDataBySection());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myOrdersState.myCurrentTab]);

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

  if (isFetchingData) {
    return <Skeleton times={6} style={{ height: "7rem", width: "100%" }} />;
  } else if (
    fetchOrders.isError ||
    fetchOrdersWaitingPayment.isError ||
    fetchOrdersCompleted.isError
  ) {
    return <ErrorPage />;
  } else {
    if (data && data.length > 0) {
      return Array.from(addCartToMap(fetchOrders.data)).map(
        ([sellerId, carts]) => {
          return (
            <div style={{ marginTop: "24px" }}>
              <MyOrderGroupItems
                key={sellerId}
                sellerInfo={carts[0].seller}
                carts={carts}
              />
            </div>
          );
        }
      );
    }

    return (
      <p
        style={{
          margin: "12px 0 0 0",
          textAlign: "center",
          fontSize: "1.4rem",
        }}
      >
        Your cart is empty
      </p>
    );
  }
};

export default MyOrderList;
