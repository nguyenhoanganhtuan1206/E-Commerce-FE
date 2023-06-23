import { useParams } from "react-router-dom";
import classes from "./OrderPayment.module.scss";
import OrderPaymentInfoDeliver from "./OrderPaymentInfoDeliver";
import OrderSummary from "./OrderSummary";
import { useFetchCartsBySellerIdQuery } from "../../../redux/apis/cart/cart.api";

const OrderPayment = () => {
  const params = useParams();

  const fetchCartsBySellerId = useFetchCartsBySellerIdQuery(params.sellerId);
  console.log(fetchCartsBySellerId.data);

  return (
    <>
      {fetchCartsBySellerId.data && (
        <div className="container mt-4">
          <div className="row">
            <div className="col-7">
              <div className={classes.OrderPaymentSide}>
                <OrderPaymentInfoDeliver
                  userInfo={fetchCartsBySellerId.data[0].user}
                />
              </div>
            </div>
            <div className="col-5">
              <div className={classes.OrderPaymentSide}>
                <OrderSummary carts={fetchCartsBySellerId.data} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderPayment;
