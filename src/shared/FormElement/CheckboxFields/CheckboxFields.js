import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

import "../FormFieldsStyle.scss";

const CheckboxFields = ({ fieldName, label, defaultChecked = false }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, value = defaultChecked } }) => {
        return (
          <div className="d-flex align-items-center mt-3">
            <input
              type="checkbox"
              id={fieldName}
              onChange={onChange}
              defaultChecked={value}
            />
            <label
              className="form-input__text"
              style={{ cursor: "pointer" }}
              htmlFor={fieldName}
            >
              {label}
            </label>
          </div>
        );
      }}
    />
  );
};

export default memo(CheckboxFields);
