import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

import "./CartPaymentMethod.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validateForm } from "../../util/validators";

const CardPaymentMethod = ({
  fieldName,
  icon,
  imgSrc,
  title,
  subTitle,
  onCheckboxChange,
  initialValue = false,
  validators = [],
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={fieldName}
      defaultValue={initialValue}
      rules={{
        validate: {
          validate: (value) => {
            if (validators.length >= 1) {
              return validateForm(value, validators);
            }
          },
        },
      }}
      render={({ field: { onChange, value = initialValue } }) => {
        return (
          <>
            <label
              className={`card__payment-method ${
                value && "card__payment-method--active"
              }`}
              htmlFor={fieldName}
            >
              <input
                type="checkbox"
                id={fieldName}
                name={fieldName}
                defaultChecked={value}
                onChange={(e) => {
                  onChange(e.target.checked);
                  onCheckboxChange(e.target.name, e.target.checked);
                }}
                style={{ display: "none" }}
              />

              {imgSrc && (
                <img
                  className="card__payment-method__img"
                  src={imgSrc}
                  alt="Icon"
                />
              )}

              {icon && (
                <FontAwesomeIcon
                  icon={icon}
                  className="card__payment-method__icon"
                />
              )}

              <div className="card__payment-method__info">
                <h4>{title}</h4>
                <span>{subTitle}</span>
              </div>
            </label>
          </>
        );
      }}
    />
  );
};

export default memo(CardPaymentMethod);
