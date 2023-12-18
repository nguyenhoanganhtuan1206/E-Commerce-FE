import classes from "./MyOrderProductItem.module.scss";
import MyOrderProductItem from "./MyOrderProductItem";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { toast } from "react-toastify";
import { ButtonFields, InputFields } from "../../../shared/FormElement";
import { PAID, UNPAID } from "../../../enums/paymentOrder.enum";
import { CardText, ModalWarning } from "../../../shared/components";
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
import { useState } from "react";
import { useCancelOrderMutation } from "../../../redux/apis/user/paymentOrder/paymentOrder.api";
import { FormProvider, useForm } from "react-hook-form";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

const MyOrderGroupItems = ({ sellerInfo = null, carts = [] }) => {
  const methods = useForm();
  const [isShowModalCancel, setIsShowModalCancel] = useState(false);

  const [cancelOrder, cancelOrderResults] = useCancelOrderMutation();

  const handleCancelOrder = (data) => {
    cancelOrder({
      id: carts[0].paymentOrder.id,
      reason: data.reasonOfCancel,
    })
      .then(() => {
        toast.success("Your cancel request sent to seller!");
        methods.reset();
        setIsShowModalCancel(false);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  return (
    <>
      {sellerInfo && (
        <div className="mycart__group">
          <div className="mycart__group-header">
            <p className="mycart-text--bold m-0">
              Product Owner:
              <span className="mycart-text--bold ml-3">
                {sellerInfo.sellerName}
              </span>
            </p>
          </div>

          <div className="mycart__group-items-list">
            {carts.map((cartItem, index) => {
              return <MyOrderProductItem key={index} cartItem={cartItem} />;
            })}

            <div className="mycart__group-footer">
              <div className="d-flex align-items-center">
                {carts[0].paymentOrder.paymentStatus === UNPAID && (
                  <ButtonFields className="mycart__payment-btn">
                    Pay Now
                  </ButtonFields>
                )}

                {carts[0].paymentOrder.deliveryStatus !== DELIVERED && (
                  <ButtonFields
                    onClick={() => setIsShowModalCancel(true)}
                    subPrimary
                    className="ml-3"
                  >
                    Cancel Order
                  </ButtonFields>
                )}

                {carts[0].paymentOrder.paymentStatus === PAID && (
                  <ButtonFields disabled className="mycart__payment-btn">
                    Paid
                  </ButtonFields>
                )}

                <div
                  className="d-flex align-items-center"
                  style={{ marginLeft: "14px" }}
                >
                  <LocalShippingIcon
                    className={classes.MyOrderProductItemIconF}
                  />

                  <CardText>
                    {(() => {
                      switch (carts[0].paymentOrder.deliveryStatus) {
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
                </div>
              </div>

              <p className="mycart__group-total-price">
                Total Price:
                <span>{`$${carts[0].totalPrice.toFixed(2)}`}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DELETE */}
      <ModalWarning
        show={isShowModalCancel}
        onCancel={() => setIsShowModalCancel(false)}
        headerWarning="Cancel Order Product"
        footer={
          <div className="d-flex align-items-center justify-content-between">
            <ButtonFields
              type="button"
              onClick={() => setIsShowModalCancel(false)}
              borderOnly
              className="seller-form__btn"
            >
              Close
            </ButtonFields>
            <ButtonFields
              onClick={methods.handleSubmit(handleCancelOrder)}
              type="button"
              isLoading={cancelOrderResults.isLoading}
              subPrimary
              className="seller-form__btn"
            >
              Confirm Cancel
            </ButtonFields>
          </div>
        }
      >
        <FormProvider {...methods}>
          <p>Seller Information</p>
          <div className="modal-seller__detail-group">
            <h3 className="modal-seller__detail-title">Seller Name:</h3>
            <span className="modal-seller__detail-text">
              {sellerInfo.sellerName}
            </span>
          </div>

          <div className="modal-seller__detail-group">
            <h3 className="modal-seller__detail-title">Seller Email:</h3>
            <span className="modal-seller__detail-text">
              {sellerInfo.emailSeller}
            </span>
          </div>

          <InputFields
            fieldName="reasonOfCancel"
            validators={[
              VALIDATOR_REQUIRED("Feedback cannot be empty"),
              VALIDATOR_MAXLENGTH(
                1000,
                "Feedback must be less than 1000 characters"
              ),
            ]}
            placeholder="Enter your content feedback"
            type="textarea"
            label="Reason for cancel (*)"
            cols="5"
            rows="10"
            htmlFor="reasonOfCancel"
          />
        </FormProvider>

        <p style={{ fontSize: "1.4rem", fontStyle: "italic" }}>
          (*) Your request has been submitted to the seller. Please await their
          confirmation.
        </p>
      </ModalWarning>
      {/* MODAL DELETE */}
    </>
  );
};

export default MyOrderGroupItems;
