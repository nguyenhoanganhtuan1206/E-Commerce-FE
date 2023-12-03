import classes from "./OrderDetailsHeader.module.scss";

import { formatDateTime } from "../../../shared/util/format-date";
import { ButtonFields, CardPaymentMethod } from "../../../shared/FormElement";
import { PAYPAL } from "../../../enums/paymentMethod.enum";
import {
  DELIVERED,
  SHIPPING,
  WAITING_CONFIRM,
  WAITING_PICKUP,
} from "../../../enums/deliveryState.enum";
import {
  DELIVERED_STATUS,
  SHIPPING_STATUS,
  WAITING_CONFIRM_STATUS,
  WAITING_PICKUP_STATUS,
} from "../../../utils/deliveryStatusText";
import { CardText } from "../../../shared/components";

const OrderDetailsHeader = ({ paymentOrderInfo = null }) => {
  return (
    <>
      <h3 className={classes.OrderDetailsHeader__Title}>
        Invoice
        <p># {paymentOrderInfo.id}</p>
      </h3>

      {paymentOrderInfo && (
        <div className={classes.OrderDetailsHeader__Container}>
          <p className={classes.OrderDetailsHeader__Group}>
            Order Status:
            <CardText style={{ backgroundColor: "var(--color-primary)" }}>
              {paymentOrderInfo.paymentStatus}
            </CardText>
          </p>

          <p className={classes.OrderDetailsHeader__Group}>
            Delivery Status:
            <CardText style={{ backgroundColor: "var(--color-primary)" }}>
              {" "}
              {(() => {
                switch (paymentOrderInfo.deliveryStatus) {
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
          </p>

          <p className={classes.OrderDetailsHeader__Group}>
            Payment Method:
            {paymentOrderInfo.paymentMethodName === PAYPAL ? (
              <CardPaymentMethod
                className="card__payment-method--active ml-5 w-40"
                disabled
                fieldName="paypal"
                imgSrc={"https://cdn-icons-png.flaticon.com/512/174/174861.png"}
                title="Payment With Paypal"
                multiple
              />
            ) : (
              <CardPaymentMethod
                initialValue={true}
                className="card__payment-method--active ml-5 w-40"
                disabled
                fieldName="cod"
                imgSrc={"https://www.coolmate.me/images/COD.svg"}
                title="Cash On Delivery"
                subTitle="Payment when received your order"
                multiple
              />
            )}
          </p>

          <p className={classes.OrderDetailsHeader__Group}>
            Ordered At:
            <span className={classes.OrderDetailsHeader__Text}>
              {formatDateTime(paymentOrderInfo.orderedAt)}
            </span>
          </p>

          <p className={classes.OrderDetailsHeader__Group}>
            Total Price:
            <span className={classes.OrderDetailsHeader__Text}>
              ${paymentOrderInfo.totalPrice.toFixed(2)}
            </span>
          </p>

          <div className="d-flex align-items-center">
            <ButtonFields
              primary
              style={{ marginRight: "12px", borderRadius: "6px" }}
            >
              Update
            </ButtonFields>
            <ButtonFields borderOnly style={{ borderRadius: "6px" }}>
              Cancel Order
            </ButtonFields>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetailsHeader;
