import { memo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import "../FormFieldsStyle.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";

import Alert from "../../components/Alert/Alert";
import { validateForm } from "../../util/validators";

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
    placeholder,
    cols = 3,
    rows = 5,
    htmlFor,
    noBorder,
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
                  <textarea
                    onChange={onChange}
                    className={`${classes} ${
                      error && "form-input__input--error"
                    }`}
                    value={value}
                    cols={cols}
                    rows={rows}
                    placeholder={placeholder}
                    name={fieldName}
                  />
                  {error && <Alert alertMessage={error.message} error />}
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
                    onChange={onChange}
                    value={value}
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
                </div>

                {error && <Alert alertMessage={error.message} error />}
              </div>
            )}
          </>
        );
      }}
    />
  );
};

export default memo(InputFields);
