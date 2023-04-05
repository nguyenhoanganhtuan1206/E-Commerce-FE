import "../FormFieldsStyle.scss";
import { memo } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { validateForm } from "../../util/validators";
import Alert from "../../components/Alert/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const SelectFields = (props) => {
  const {
    fieldName,
    initialValue,
    validators = [],
    label,
    htmlFor,
    className,
    isLoading,
    children,
  } = props;

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
      render={({
        field: { onChange, value = initialValue },
        fieldState: { error },
      }) => {
        return (
          <div className="form-input__group">
            <label
              className={`form-input__label  ${value ? "change-event" : null}`}
              htmlFor={htmlFor}
            >
              {label}
            </label>
            <div className="form-input__wrapper">
              <select
                onChange={onChange}
                name={fieldName}
                className={`form-input__input ${className}`}
                value={value}
              >
                {children}
              </select>
              {isLoading && (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="form-input--loading"
                />
              )}
            </div>
            {error && <Alert alertMessage={error.message} error />}
          </div>
        );
      }}
    />
  );
};

export default memo(SelectFields);
