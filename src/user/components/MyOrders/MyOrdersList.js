import { useFetchOrdersQuery } from "../../../redux/apis/user/orders/my-orders.api";

const MyOrderList = () => {
  const fetchOrders = useFetchOrdersQuery();

  console.log("fetchOrders", fetchOrders);

  return;
};
