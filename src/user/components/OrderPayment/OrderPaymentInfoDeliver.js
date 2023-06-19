import classes from "./OrderPaymentInfoDeliver.module.scss";

const OrderPaymentInfoDeliver = () => {
  return (
    <>
      <h3 className={classes.HeadingText}>Shipping & Billing Information</h3>

      <div className={classes.UserDetail}>
        <div className={classes.UserDetail__Group}>
          <h3 className={classes.UserDetail__Title}>Name (*)</h3>
          <span>Tuan</span>
        </div>

        <div className={classes.UserDetail__Group}>
          <h3 className={classes.UserDetail__Title}>Phone Number (*)</h3>
          <span>Tuan</span>
        </div>

        <div className={classes.UserDetail__Group}>
          <h3 className={classes.UserDetail__Title}>Email (*)</h3>
          <span>Tuan</span>
        </div>

        <div className={classes.UserDetail__Group}>
          <h3 className={classes.UserDetail__Title}>Address (*)</h3>
          <span>Tuan</span>
          <span
            className="ml-3"
            style={{
              color: "var(--color-primary)",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Change Address
          </span>
        </div>
      </div>

      <h3 className={`${classes.HeadingText} mt-3`}>Payment Method</h3>

      <div className={classes.UserDetail}></div>
    </>
  );
};

export default OrderPaymentInfoDeliver;
