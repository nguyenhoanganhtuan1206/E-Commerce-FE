import { memo, useCallback } from "react";

import "./CartPaymentMethod.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  handleSelectChangePaymentMethod,
  handleSelectMultiplePaymentMethod,
} from "../../../redux/slices/seller/add-product/addProductSlice";

export const PAYMENT_WITH_PAYPAL = "Paypal";
export const PAYMENT_WITH_COD = "COD";

const CardPaymentMethod = ({
  fieldName,
  icon,
  imgSrc,
  title,
  subTitle,
  initialValue = false,
  multiple = false,
  className,
  disabled,
}) => {
  const paymentMethodsState = useSelector((state) => state.addProduct);
  const dispatch = useDispatch();
  const isPaymentMethodActive = multiple
    ? paymentMethodsState.paymentMethods.includes(fieldName)
    : paymentMethodsState.paymentMethod === fieldName;

  const cardPaymentMethodClasses = `${className} card__payment-method ${
    isPaymentMethodActive ? "card__payment-method--active" : ""
  }`;

  const handleCheckboxChange = useCallback(
    (name, checked) => {
      if (multiple) {
        dispatch(handleSelectMultiplePaymentMethod({ name, checked }));
      }

      if (!multiple) {
        dispatch(handleSelectChangePaymentMethod(name));
      }
    },
    [dispatch, multiple]
  );

  return (
    <>
      <label
        className={`card__payment-method ${cardPaymentMethodClasses}`}
        htmlFor={fieldName}
      >
        <input
          type="checkbox"
          id={fieldName}
          disabled={disabled}
          name={fieldName}
          defaultChecked={initialValue}
          onChange={(e) => {
            handleCheckboxChange(e.target.name, e.target.checked);
          }}
          style={{ display: "none" }}
        />

        {imgSrc && (
          <img className="card__payment-method__img" src={imgSrc} alt="Icon" />
        )}

        {icon && (
          <FontAwesomeIcon icon={icon} className="card__payment-method__icon" />
        )}

        <div className="card__payment-method__info">
          <h4>{title}</h4>
          <span>{subTitle}</span>
        </div>
      </label>
    </>
  );
};

export default memo(CardPaymentMethod);
