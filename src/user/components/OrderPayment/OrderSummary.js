import ButtonFields from "../../../shared/FormElement/ButtonFields/ButtonFields";
import classes from "./OrderSummary.module.scss";

const OrderSummary = ({ carts = [] }) => {
  return (
    <>
      <div className={classes.SummaryHeader}>
        <h3>Order Summary</h3>
      </div>

      <ul className={classes.OrderList}>
        {carts.map((cartItem) => {
          return (
            <li className={classes.OrderItem}>
              <div className={classes.OrderItem__Group}>
                <img
                  className={classes.OrderItem__Image}
                  src="https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="abc"
                />

                <div className={classes.OrderItem__Detail}>
                  <h3 className={classes.ProductName}>
                    {cartItem.product.name}
                  </h3>
                  {cartItem.product.inventory && (
                    <div className="d-flex flex-column">
                      <span>
                        {cartItem.product.inventory.colorValue},{" "}
                        {cartItem.product.inventory.sizeValue}
                      </span>

                      <div className="d-flex align-items-center">
                        {cartItem.product.categories.map((category, index) => (
                          <span style={{ flex: "0" }}>
                            {category.categoryName}
                            {index + 1 !== cartItem.product.categories.length &&
                              ", "}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <span className={classes.OrderItem__Quantity}>
                  {cartItem.quantity} x{" "}
                  {cartItem.product.inventory
                    ? `$${cartItem.product.inventory.price.toFixed(2)}`
                    : `$${cartItem.product.price.toFixed(2)}`}
                </span>
              </div>
              <span className="font-weight-bold">{`$${cartItem.totalPrice.toFixed(
                2
              )}`}</span>
            </li>
          );
        })}
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
        <p>Total ({carts.length} items)</p>

        <p>
          {`$${carts
            .reduce((total, item) => total + item.totalPrice, 0)
            .toFixed(2)}`}
        </p>
      </div>
      <ButtonFields primary fullWidth>
        Checkout
      </ButtonFields>
    </>
  );
};

export default OrderSummary;
