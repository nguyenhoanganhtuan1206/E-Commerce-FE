import ButtonFields from "../../../shared/FormElement/ButtonFields/ButtonFields";
import classes from "./OrderSummary.module.scss";

const OrderSummary = () => {
  return (
    <>
      <div className={classes.SummaryHeader}>
        <h3>Order Summary</h3>
      </div>

      <ul className={classes.OrderList}>
        <li className={classes.OrderItem}>
          <div className={classes.OrderItem__Group}>
            <img
              className={classes.OrderItem__Image}
              src="https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="abc"
            />

            <div className={classes.OrderItem__Detail}>
              <h3 className={classes.ProductName}>ABC</h3>
              <div className="d-flex flex-column">
                <span>Size, Quantity</span>
                <span>Size, Quantity</span>
              </div>
            </div>
            <span className={classes.OrderItem__Quantity}>2 x $50</span>
          </div>
          <span className="font-weight-bold">$120</span>
        </li>

        <li className={classes.OrderItem}>
          <div className={classes.OrderItem__Group}>
            <img
              className={classes.OrderItem__Image}
              src="https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="abc"
            />

            <div className={classes.OrderItem__Detail}>
              <h3 className={classes.ProductName}>ABC</h3>
              <div className="d-flex flex-column">
                <span>Size, Quantity</span>
                <span>Size, Quantity</span>
              </div>
            </div>
            <span className={classes.OrderItem__Quantity}>2 x $50</span>
          </div>
          <span className="font-weight-bold">$120</span>
        </li>

        <li className={classes.OrderItem}>
          <div className={classes.OrderItem__Group}>
            <img
              className={classes.OrderItem__Image}
              src="https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="abc"
            />

            <div className={classes.OrderItem__Detail}>
              <h3 className={classes.ProductName}>ABC</h3>
              <div className="d-flex flex-column">
                <span>Size, Quantity</span>
                <span>Size, Quantity</span>
              </div>
            </div>
            <span className={classes.OrderItem__Quantity}>2 x $50</span>
          </div>
          <span className="font-weight-bold">$120</span>
        </li>
      </ul>

      <div className={classes.SummaryItem}>
        <div className={classes.SummaryGroup}>
          <p>Subtotal</p>
          <span>$120</span>
        </div>

        <div className={classes.SummaryGroup}>
          <p>Shipping</p>
          <span>$20</span>
        </div>
        <p className={classes.SummaryItemWarning}>
          (Shipping is free if your order over $300 or more.)
        </p>
      </div>

      <div className={classes.SummaryBottom}>
        <p>Total (1 items)</p>

        <p>$140</p>
      </div>
      <ButtonFields primary fullWidth>
        Checkout
      </ButtonFields>
    </>
  );
};

export default OrderSummary;
