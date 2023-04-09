import { memo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import "../FormFieldsStyle.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";

import Alert from "../../components/Alert/Alert";
import { validateForm } from "../../util/validators";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

/* This function just need 2 parameters state ,action
-> If will work fine if put external */

const InputFields = (props) => {
  /*
  ? fieldName need set to follow value in specific input
  ? validators for validate
  ? initialValue for set initial value and current value
  ? initialValid for valid input
  */
  const {
    fieldName,
    validators = [],
    initialValue = "",
    label,
    required,
    className,
    type,
    isLoading,
    placeholder,
    cols = 3,
    rows = 5,
    htmlFor,
    noBorder,
    alertErrorMessage,
  } = props;

  const { control } = useFormContext();

  const [isHiddenPassword, setIsHiddenPassword] = useState(false);

  const showInputType = () => {
    if (type === "password") {
      return isHiddenPassword ? "text" : "password";
    } else {
      return type;
    }
  };

  const classes = `form-input__input ${className}
  ${noBorder ? "noBorder" : null}`;

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
          <>
            {type === "textarea" ? (
              <>
                <div className="form-input__group">
                  <label
                    className={`form-input__label  ${
                      value ? "change-event" : null
                    }`}
                    htmlFor={htmlFor}
                  >
                    {label}
                  </label>
                  <div className="form-input__wrapper">
                    <textarea
                      onChange={onChange}
                      value={value}
                      className={`${classes} ${
                        error && "form-input__input--error"
                      }`}
                      cols={cols}
                      rows={rows}
                      placeholder={placeholder}
                      name={fieldName}
                    />
                    {isLoading && (
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="form-input--loading"
                      />
                    )}
                  </div>
                  {(alertErrorMessage || error) && (
                    <Alert
                      alertMessage={alertErrorMessage || error.message}
                      error={alertErrorMessage || error}
                    />
                  )}
                </div>
              </>
            ) : (
              <div className="form-input__group">
                <label
                  className={`form-input__label  ${
                    value ? "change-event" : null
                  }`}
                  htmlFor={htmlFor}
                >
                  {label}
                </label>
                <div className="form-input__wrapper">
                  <input
                    value={value}
                    onChange={onChange}
                    type={showInputType()}
                    className={`${classes} ${
                      error && "form-input__input--error"
                    }`}
                    placeholder={placeholder}
                    required={required}
                    name={fieldName}
                  />

                  {type === "password" && isHiddenPassword && (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="form-input__hidden-password"
                      onClick={() => setIsHiddenPassword(!isHiddenPassword)}
                    />
                  )}

                  {type === "password" && !isHiddenPassword && (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="form-input__hidden-password"
                      onClick={() => setIsHiddenPassword(!isHiddenPassword)}
                    />
                  )}

                  {isLoading && (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="form-input--loading"
                    />
                  )}
                </div>

                {(alertErrorMessage || error) && (
                  <Alert
                    alertMessage={alertErrorMessage || error.message}
                    error={alertErrorMessage || error}
                  />
                )}
              </div>
            )}
          </>
        );
      }}
    />
  );
};

export default memo(InputFields);
