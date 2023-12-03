import classes from "./OrderDetails.module.scss";

import { useParams } from "react-router-dom";

import { useFetchOrderDetailsQuery } from "../../../redux/apis/seller/orders/orders.api";
import { ErrorPage } from "../../../shared/pages";
import InvoiceOrder from "../../../shared/components/InvoiceOrder/InvoiceOrder";
import OrderDetailsHeader from "./OrderDetailsHeader";
import OrderDetailsContent from "./OrderDetailsContent";
import OrderUserDetails from "./OrderUserDetails";

const OrderDetails = () => {
  const orderIdParams = useParams("orderId");
  const fetchOrders = useFetchOrderDetailsQuery(orderIdParams.orderId);

  if (fetchOrders.isError) {
    return <ErrorPage />;
  }

  return (
    <>
      {!fetchOrders.isFetching && (
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-8">
              <div className={classes.InvoiceOrderHeader}>
                <OrderDetailsHeader
                  paymentOrderInfo={fetchOrders.data[0].paymentOrder}
                />
              </div>

              <div className={classes.InvoiceOrderBody}>
                <OrderDetailsContent orderInfo={fetchOrders.data} />
              </div>
            </div>
            <div className="col-4">
              <OrderUserDetails userInfo={fetchOrders.data[0].user} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
