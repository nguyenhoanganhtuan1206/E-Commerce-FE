import "../FormFieldsStyle.scss";

import { Controller, useFormContext } from "react-hook-form";

import { validateForm } from "../../util/validators";
import Alert from "../../components/Alert/Alert";

const SelectFields = (props) => {
  const {
    fieldName,
    initialValue,
    validators = [],
    label,
    htmlFor,
    className,
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
          <div className="form-input">
            <label
              className={`form-input__label  ${value ? "change-event" : null}`}
              htmlFor={htmlFor}
            >
              {label}
            </label>
            <select
              onChange={onChange}
              name={fieldName}
              className={`form-input__input ${className}`}
              value={value}
            >
              {children}
            </select>
            {error && <Alert alertMessage={error.message} error />}
          </div>
        );
      }}
    />
  );
};

export default SelectFields;
