import classes from "./MyOrderProductItem.module.scss";
import MyOrderProductItem from "./MyOrderProductItem";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { ButtonFields } from "../../../shared/FormElement";
import { PAID, UNPAID } from "../../../enums/paymentOrder.enum";
import { CardText } from "../../../shared/components";
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

const MyOrderGroupItems = ({ sellerInfo = null, carts = [] }) => {
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

                {carts[0].paymentOrder.paymentStatus === PAID && (
                  <ButtonFields disabled className="mycart__payment-btn">
                    Paid
                  </ButtonFields>
                )}

                <div
                  className="d-flex align-items-center"
                  style={{ marginLeft: "14px" }}
                >
                  <LocalShippingIcon className={classes.MyOrderProductItemIconF} />

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
    </>
  );
};

export default MyOrderGroupItems;
