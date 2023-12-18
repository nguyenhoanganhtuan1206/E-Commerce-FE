import classes from "./OrderDetailsHeader.module.scss";
import { useState } from "react";

import { formatDateTime } from "../../../shared/util/format-date";
import { ButtonFields, CardPaymentMethod } from "../../../shared/FormElement";
import { PAYPAL } from "../../../enums/paymentMethod.enum";
import { CardText, Modal } from "../../../shared/components";
import {
  CANCELING,
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
import { useUpdateDeliveryStatusMutation } from "../../../redux/apis/user/paymentOrder/paymentOrder.api";
import { toast } from "react-toastify";

const OrderDetailsHeader = ({ paymentOrderInfo = null }) => {
  console.log("paymentOrderInfo", paymentOrderInfo);
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [isUpdateModal, setIsUpdateModal] = useState(false);

  const [updateDeliveryStatus, updateDeliveryStatusResults] =
    useUpdateDeliveryStatusMutation();

  const handleOnChangeDeliveryStatus = (e) => {
    setDeliveryStatus(e.target.value);
  };

  const handleOnSubmitUpdate = () => {
    if (!paymentOrderInfo || !deliveryStatus) {
      toast.error("Something went wrong! Please try again.");
      return;
    }

    updateDeliveryStatus({
      orderPaymentId: paymentOrderInfo.id,
      deliveryStatus,
    })
      .then((res) => {
        toast.success("Updated this order successfully!");
        // window.location.reload();
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

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

          {paymentOrderInfo.deliveryStatus === DELIVERED ? (
            <p className={classes.OrderDetailsHeader__Group}>
              Delivery Status:
              <CardText style={{ backgroundColor: "var(--color-primary)" }}>
                {DELIVERED}
              </CardText>
            </p>
          ) : (
            <div className="form-input__group">
              <label className="form-input__label">Delivery Status:</label>
              <select
                onChange={handleOnChangeDeliveryStatus}
                className="form-input__input"
                value={deliveryStatus || paymentOrderInfo.deliveryStatus}
              >
                <option value={DELIVERED}>{DELIVERED_STATUS}</option>
                <option value={WAITING_CONFIRM}>
                  {WAITING_CONFIRM_STATUS}
                </option>
                <option value={WAITING_PICKUP}>{WAITING_PICKUP_STATUS}</option>
                <option value={SHIPPING}>{SHIPPING_STATUS}</option>
              </select>
            </div>
          )}

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

          {paymentOrderInfo.deliveryStatus === CANCELING && (
            <p
              style={{
                fontSize: "1.4rem",
                color: "var(--color-grey-dark-2)",
                fontWeight: 600,
                fontStyle: "italic",
                margin: "0 0 12px 0",
              }}
            >
              (*) The user recently requested to cancel this order with reason{" "}
              {paymentOrderInfo.reasonOfCancel}
            </p>
          )}

          <div className="d-flex align-items-center">
            <ButtonFields
              primary
              style={{ marginRight: "12px", borderRadius: "6px" }}
              onClick={() => setIsUpdateModal(true)}
            >
              Update
            </ButtonFields>

            <ButtonFields borderOnly style={{ borderRadius: "6px" }}>
              Cancel Order
            </ButtonFields>
          </div>
        </div>
      )}

      <Modal
        show={isUpdateModal}
        onCancel={() => setIsUpdateModal(false)}
        footer={
          <div className="d-flex justify-content-end">
            <ButtonFields
              primary
              style={{ marginRight: "12px", borderRadius: "6px" }}
              onClick={handleOnSubmitUpdate}
              isLoading={updateDeliveryStatusResults.isLoading}
            >
              Update
            </ButtonFields>
            <ButtonFields
              onClick={() => setIsUpdateModal(false)}
              borderOnly
              style={{ borderRadius: "6px" }}
            >
              Cancel
            </ButtonFields>
          </div>
        }
      >
        <p style={{ fontSize: "1.6rem", fontWeight: 600, margin: 0 }}>
          Would you like to modify the delivery status for this order?
        </p>
      </Modal>
    </>
  );
};

export default OrderDetailsHeader;
