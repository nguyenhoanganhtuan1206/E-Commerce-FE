import classes from "./MyOrderProductItem.module.scss";

import { useEffect, useState } from "react";

import { useFetchFilesFirebase } from "../../../firebase/image-product/firebase-service";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { CartListItem, LoadingSpinner } from "../../../shared/components";
import { ButtonFields } from "../../../shared/FormElement";
import { PAID, UNPAID } from "../../../enums/paymentOrder.enum";
import {
  DELIVERED,
  SHIPPING,
  WAITING_CONFIRM,
  WAITING_PICKUP,
} from "../../../enums/deliveryState.enum";

const DELIVERED_STATUS = "Delivered";
const SHIPPING_STATUS = "Shipping";
const WAITING_PICKUP_STATUS = "Waiting For Pickup";
const WAITING_CONFIRM_STATUS = "Waiting For Confirm";

const MyOrderProductItem = ({ cartItem = null }) => {
  console.log("cart", cartItem);
  const [imagesProduct, setImagesProduct] = useState(new Map());
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const [handleFetchProfile] = useFetchFilesFirebase(cartItem.product.id);

  useEffect(() => {
    if (cartItem.product.id) {
      setIsLoadingImage(true);
      handleFetchProfile(cartItem.product.id)
        .then((res) => {
          const map = new Map();

          res.imagesProduct.forEach((item) => {
            map.set(item.fileName, item.url);
          });

          setImagesProduct(
            map && map.size > 0 ? Array.from(map.values())[0] : []
          );
        })
        .finally(() => setIsLoadingImage(false));
    }
  }, [cartItem.product.id, handleFetchProfile]);

  return (
    <>
      {isLoadingImage && <LoadingSpinner />}

      {!isLoadingImage && (
        <>
          <CartListItem cartItem={cartItem} imagesProduct={imagesProduct}>
            <p className="cart__product-item__text mycart-text--bold">
              {`$${cartItem.cartProductInventory.totalPrice.toFixed(2)}`}
            </p>
          </CartListItem>

          <div className="mycart__group-footer">
            <div className="d-flex align-items-center">
              {cartItem.paymentOrder.paymentStatus === UNPAID && (
                <ButtonFields className="mycart__payment-btn">
                  Pay Now
                </ButtonFields>
              )}

              {cartItem.paymentOrder.paymentStatus === PAID && (
                <ButtonFields disabled className="mycart__payment-btn">
                  Paid
                </ButtonFields>
              )}

              <div
                className="d-flex align-items-center"
                style={{ marginLeft: "14px" }}
              >
                <LocalShippingIcon className={classes.MyOrderProductItemIcon} />

                <p className={classes.MyOrderProductItemTextCard}>
                  {(() => {
                    switch (cartItem.paymentOrder.deliveryStatus) {
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
                </p>
              </div>
            </div>

            <p className="mycart__group-total-price">
              Total Price:
              <span>{`$${cartItem.totalPrice.toFixed(2)}`}</span>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default MyOrderProductItem;
