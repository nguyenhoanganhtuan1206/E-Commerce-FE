import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import usePaginate from "../../../shared/hooks/usePaginate";
import { useFetchOrdersSellerQuery } from "../../../redux/apis/seller/orders/orders.api";
import { MANAGEMENT_ORDER } from "../../../redux/slices/seller/management-orders/managementOrdersSlides";
import { ErrorPage } from "../../../shared/pages";
import { ButtonFields } from "../../../shared/FormElement";
import {
  CardText,
  LoadingSpinner,
  Pagination,
  Table,
} from "../../../shared/components";
import {
  DELIVERED,
  SHIPPING,
  WAITING_CONFIRM,
  WAITING_PICKUP,
} from "../../../enums/deliveryState.enum";
import { formatDateTime } from "../../../shared/util/format-date";
import {
  DELIVERED_STATUS,
  SHIPPING_STATUS,
  WAITING_CONFIRM_STATUS,
  WAITING_PICKUP_STATUS,
} from "../../../utils/deliveryStatusText";

const headers = [
  "Order ID",
  "Ordered At",
  "Total Price",
  "Payment Status",
  "Delivery Status",
  "Actions",
];

const OrdersList = () => {
  const fetchOrders = useFetchOrdersSellerQuery();
  const orderTabsState = useSelector((state) => state.managementOrders);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [capacityPage, setCapacityPage] = useState(6);
  const { paginate } = usePaginate();

  let isFetchingData = false;
  const handleFetchDataBySection = () => {
    // dispatch(
    //   fetchOrdersPaid(
    //     fetchProductWithInStock.data ? fetchProductWithInStock.data.length : 0
    //   )
    // );
    // dispatch(
    //   fetchOrdersNotYetPaid(
    //     fetchProductOutOfStock.data ? fetchProductOutOfStock.data.length : 0
    //   )
    // );

    switch (orderTabsState.myAdCurrentSection) {
      case MANAGEMENT_ORDER.ALL_ORDER:
        isFetchingData = fetchOrders.isFetching;
        return fetchOrders.data;

      default:
        isFetchingData = fetchOrders.isFetching;
        return fetchOrders.data;
    }
  };

  const storage = paginate(
    handleFetchDataBySection() || [],
    currentPage,
    capacityPage
  );

  const handleRedirectPage = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const tableBodyContent =
    storage.length > 0 &&
    storage.map((data, index) => (
      <tr key={index}>
        <td>{data.id}</td>
        <td>{formatDateTime(data.orderedAt)}</td>
        <td>$ {data.totalPrice.toFixed(2)}</td>
        <td>
          <CardText style={{ backgroundColor: "var(--color-primary)" }}>
            {data.paymentStatus}
          </CardText>
        </td>
        <td>
          <CardText>
            {(() => {
              switch (data.deliveryStatus) {
                case DELIVERED:
                  return DELIVERED_STATUS;
                case WAITING_CONFIRM:
                  return WAITING_CONFIRM_STATUS;
                case WAITING_PICKUP:
                  return WAITING_PICKUP_STATUS;
                case SHIPPING:
                  return SHIPPING_STATUS;
                default:
                  return "Something went wrong!!";
              }
            })()}
          </CardText>
        </td>

        <td>
          <ButtonFields to={`/seller/orders/${data.id}/details`} primary>
            Details
          </ButtonFields>
        </td>
      </tr>
    ));

  useEffect(() => {
    handleFetchDataBySection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderTabsState.myAdCurrentSection]);

  if (isFetchingData) {
    return isFetchingData && <LoadingSpinner option1 noOverlay />;
  } else if (fetchOrders.isError) {
    return <ErrorPage />;
  } else {
    return (
      <>
        {fetchOrders.data.length === 0 ? (
          <p>Your orders is empty</p>
        ) : (
          <Table headers={headers} tbody={tableBodyContent} bordered>
            <Pagination
              capacityPage={capacityPage}
              totalData={fetchOrders.data.length}
              currentPage={currentPage}
              onRedirect={handleRedirectPage}
            />
          </Table>
        )}
      </>
    );
  }
};

export default OrdersList;
