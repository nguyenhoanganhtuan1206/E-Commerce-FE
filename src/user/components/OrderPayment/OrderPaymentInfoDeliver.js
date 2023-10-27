import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./OrderPaymentInfoDeliver.module.scss";

import ModalChangeAddressOrderPayment from "./ModalChangeAddressOrderPayment";
import {
  toggleShowModalChangeAddress,
  updateProfileUserDelivery,
} from "../../../redux/slices/cart/cartSlice";
import { useFetchLocationsQuery } from "../../../redux/apis/user/location/user-locations.api";
import { CardPaymentMethod } from "../../../shared/FormElement";
import {
  PAYMENT_WITH_COD,
  PAYMENT_WITH_PAYPAL,
} from "../../../shared/FormElement/CardPaymentMethod/CardPaymentMethod";

const OrderPaymentInfoDeliver = ({ userInfo }) => {
  const dispatch = useDispatch();
  const orderPaymentSliceState = useSelector((state) => state.cartSlice);
  const fetchLocationByUserId = useFetchLocationsQuery(userInfo.id);

  useEffect(() => {
    if (fetchLocationByUserId.data && userInfo) {
      const location = fetchLocationByUserId.data
        .filter((locationItem) => locationItem.defaultLocation)
        .map(
          (filteredLocation) =>
            `${filteredLocation.province}, ${filteredLocation.district}, ${filteredLocation.commune}`
        )
        .join(", ");

      const payload = {
        username: userInfo.username,
        address: userInfo.address,
        location,
        phoneNumber: userInfo.phoneNumber,
        emailAddress: userInfo.email,
      };

      dispatch(updateProfileUserDelivery(payload));
    }
  }, [dispatch, fetchLocationByUserId.data, userInfo]);

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
          <span>{userInfo.address}</span>
        </div>

        <div className={classes.UserDetail__Group}>
          <h3 className={classes.UserDetail__Title}>Locations (*)</h3>
          {!fetchLocationByUserId.isFetching &&
            fetchLocationByUserId.data
              .filter((locationItem) => locationItem.defaultLocation)
              .map((filteredLocation, index) => (
                <span key={index}>
                  {filteredLocation.province}, {filteredLocation.district},{" "}
                  {filteredLocation.commune}
                </span>
              ))}
          <span
            onClick={() => dispatch(toggleShowModalChangeAddress(userInfo.id))}
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
        <div className="col-6">
          <CardPaymentMethod
            fieldName={PAYMENT_WITH_COD}
            imgSrc={"https://www.coolmate.me/images/COD.svg"}
            title="Cash On Delivery"
            subTitle="Payment when received your order"
          />
        </div>
        <div className="col-6">
          <CardPaymentMethod
            fieldName={PAYMENT_WITH_PAYPAL}
            imgSrc={"https://cdn-icons-png.flaticon.com/512/174/174861.png"}
            title="Payment With Paypal"
          />
        </div>
      </div>

      {orderPaymentSliceState.userIdModalChangeAddress && (
        <ModalChangeAddressOrderPayment />
      )}
    </>
  );
};

export default OrderPaymentInfoDeliver;