import classes from "./OrderSummary.module.scss";

import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import { useCreatePaymentMutation } from "../../../redux/apis/user/paymentOrder/paymentOrder.api";
import { useFetchByCartIdQuery } from "../../../redux/apis/cart_product_inventory/cart_product_inventory.api";
import { ErrorPage } from "../../../shared/pages";
import {
  LoadingSpinner,
  ProductImageDisplay,
} from "../../../shared/components";
import ButtonFields from "../../../shared/FormElement/ButtonFields/ButtonFields";
import {
  PAYMENT_WITH_COD,
  PAYMENT_WITH_PAYPAL,
} from "../../../shared/FormElement/CardPaymentMethod/CardPaymentMethod";
import { InventoryHelper } from "../../../helper/InventoryHelper.ts";

const MESSAGE_ERROR =
  "Something went wrong while processing to payment. Please try again!";

const OrderSummary = ({ carts = null }) => {
  console.log("cart", carts);
  const params = useParams();
  const navigate = useNavigate();

  const [isShowPaymentPaypal, setIsShowPaymentPaypal] = useState(false);

  const paymentMethodState = useSelector((state) => state.addProduct);
  const [createPaymentOrder, createPaymentOrderResults] =
    useCreatePaymentMutation();
  const listCartProductInventories = useFetchByCartIdQuery(params.cartId);

  let isHaveInventory = false;

  const calculateTotalPriceOrder = () => {
    if (!carts[0]) {
      toast.error(MESSAGE_ERROR);
      return;
    }

    if (carts[0].totalPrice >= 300) {
      return carts[0].totalPrice;
    }

    return carts[0].totalPrice + 20;
  };

  const handleCheckoutCart = () => {
    if (!paymentMethodState.paymentMethod) {
      toast.error("You have to select payment method!");
      return;
    }

    if (paymentMethodState.paymentMethod === PAYMENT_WITH_PAYPAL) {
      setIsShowPaymentPaypal(true);
    }

    if (paymentMethodState.paymentMethod === PAYMENT_WITH_COD) {
      setIsShowPaymentPaypal(false);
      callApiForPayment();
    }
  };

  const handlePaymentWithPaypalSuccess = () => {
    callApiForPayment();
  };

  const callApiForPayment = () => {
    const { paymentMethod } = paymentMethodState;
    if (params.cartId && paymentMethodState.paymentMethod) {
      createPaymentOrder({
        cartId: params.cartId,
        paymentMethodName: paymentMethod,
      })
        .unwrap()
        .then(() => {
          toast.success("Your order payment successfully!");
          navigate("/my-orders");
        })
        .catch((error) => toast.error(error.data.message));
    }
  };

  const displayCartDetail = () => {
    return carts.map((cartItem, index) => {
      if (cartItem.cartProductInventory.inventoryId) {
        isHaveInventory = true;
      }

      return (
        <>
          <li key={index} className={classes.OrderItem}>
            <div className={classes.OrderItem__Group}>
              <ProductImageDisplay
                productId={cartItem.product.id}
                className={classes.OrderItem__Image}
              />

              <div className={classes.OrderItem__Detail}>
                <h3 className={classes.ProductName}>{cartItem.product.name}</h3>
                {cartItem.product.inventory && (
                  <div className="d-flex flex-column">
                    {isHaveInventory && (
                      <span>
                        {InventoryHelper.filterInventory(
                          cartItem.product.inventories,
                          cartItem.cartProductInventory.inventoryId
                        ).map((inventoryItem, index) => {
                          return (
                            <Fragment key={index}>
                              {inventoryItem.colorValue},{" "}
                              {inventoryItem.sizeValue}
                            </Fragment>
                          );
                        })}
                      </span>
                    )}

                    <div className="d-flex align-items-center">
                      {cartItem.product.categories.map((category, index) => (
                        <span key={index} style={{ flex: "0" }}>
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
                {cartItem.cartProductInventory.quantity} x{" "}
                {isHaveInventory
                  ? InventoryHelper.filterInventory(
                      cartItem.product.inventories,
                      cartItem.cartProductInventory.inventoryId
                    ).map((inventoryItem, index) => {
                      return (
                        <Fragment key={index}>
                          {`$${inventoryItem.price.toFixed(2)}`}
                        </Fragment>
                      );
                    })
                  : `$${cartItem.product.price.toFixed(2)} `}
              </span>
            </div>

            <span className="font-weight-bold">{`$${cartItem.cartProductInventory.totalPrice.toFixed(
              2
            )}`}</span>
          </li>
        </>
      );
    });
  };

  if (listCartProductInventories.isLoading) {
    return <LoadingSpinner option2 />;
  } else if (listCartProductInventories.isError) {
    return <ErrorPage messageError={MESSAGE_ERROR} />;
  } else {
    return (
      <>
        <div className={classes.SummaryHeader}>
          <h3>Order Summary</h3>
        </div>

        <ul className={classes.OrderList}>
          {displayCartDetail()}
          {/* {carts.map((cartItem, index) => {
            return (
            
            );
          })} */}
        </ul>

        <div className={classes.SummaryItem}>
          <div className={classes.SummaryGroup}>
            <p>Subtotal</p>
            <span>{`$${listCartProductInventories.data.reduce(
              (total, item) => total + item.totalPrice,
              0
            )}`}</span>
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
          <p>Total ({listCartProductInventories.data.length} items)</p>

          <p>{`$${calculateTotalPriceOrder().toFixed(2)}`}</p>
        </div>
        <ButtonFields
          onClick={handleCheckoutCart}
          type="button"
          primary
          fullWidth
          isLoading={createPaymentOrderResults.isLoading}
        >
          Checkout
        </ButtonFields>

        {isShowPaymentPaypal && (
          <PayPalScriptProvider
            options={{
              clientId:
                "AUjn8BFrx9T7F--2MqLonAaLr33qQVFHo3Pn43lbJhFmSCz8JgAdi4IDs0pl1rUMzAnJm5GLhGngWPYz",
            }}
          >
            <PayPalButtons
              className="mt-3"
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: calculateTotalPriceOrder(),
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  handlePaymentWithPaypalSuccess(details, data);
                });
              }}
              onError={() =>
                toast.error(
                  "Something went wrong payment with Paypal! Please try again"
                )
              }
            />
          </PayPalScriptProvider>
        )}
      </>
    );
  }
};

export default OrderSummary;
