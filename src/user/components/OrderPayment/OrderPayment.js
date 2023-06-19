import classes from "./OrderPayment.module.scss";
import OrderPaymentInfoDeliver from "./OrderPaymentInfoDeliver";
import OrderSummary from "./OrderSummary";

const OrderPayment = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-7">
          <div className={classes.OrderPaymentSide}>
            <OrderPaymentInfoDeliver />
          </div>
        </div>
        <div className="col-5">
          <div className={classes.OrderPaymentSide}>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPayment;
