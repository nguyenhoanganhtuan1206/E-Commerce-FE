import classes from "./OrderPaymentInfoDeliver.module.scss";

const OrderPaymentInfoDeliver = ({ userInfo }) => {
  return (
    <>
      <h3 className={classes.HeadingText}>Shipping & Billing Information</h3>

      <div className={classes.UserDetail}>
        <div className={classes.UserDetail__Group}>
          <h3 className={classes.UserDetail__Title}>Name (*)</h3>
          <span>{userInfo.username}</span>
        </div>

        <div className={classes.UserDetail__Group}>
          <h3 className={classes.UserDetail__Title}>Phone Number (*)</h3>
          <span>{userInfo.phoneNumber}</span>
        </div>

        <div className={classes.UserDetail__Group}>
          <h3 className={classes.UserDetail__Title}>Email (*)</h3>
          <span>{userInfo.email}</span>
        </div>

        <div className={classes.UserDetail__Group}>
          <h3 className={classes.UserDetail__Title}>Address (*)</h3>
          {userInfo.locations
            .filter((locationItem) => locationItem)
            .map((filteredLocation, index) => (
              <span>
                {filteredLocation.province}, {filteredLocation.district},{" "}
                {filteredLocation.commune}
              </span>
            ))}
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

      <div className={`${classes.UserDetail} row`}>
        {/* <div className="col-6">
        <CardPaymentMethod
          fieldName="cod"
          imgSrc={"https://www.coolmate.me/images/COD.svg"}
          title="Cash On Delivery"
          subTitle="Payment when received your order"
          // onCheckboxChange={handleCheckboxChange}
        />
      </div>
      <div className="col-6">
        <CardPaymentMethod
          fieldName="paypal"
          imgSrc={"https://cdn-icons-png.flaticon.com/512/174/174861.png"}
          title="Payment With Paypal"
          // onCheckboxChange={handleCheckboxChange}
        />
      </div> */}
      </div>
    </>
  );
};

export default OrderPaymentInfoDeliver;
