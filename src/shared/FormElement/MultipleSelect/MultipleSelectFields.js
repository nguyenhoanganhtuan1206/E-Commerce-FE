import "./MultipleSelectFields.scss";

import { useState } from "react";

import { Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";

import { handleOnChange } from "../../../redux/slices/FormElement/MultipleSelect/multipleSelectSlice";
import { validateForm } from "../../util/validators";

/**
 *
 * @propName :used for get data from Object. For example: categories[propName] => categories.name\
 * @subData and @subState is data and state of customize from user
 */

const MultipleSelectFields = ({
  fieldName,
  data = [],
  propName,
  placeholder,
  label,
  htmlFor,
  componentAddNew,
  componentSubData,
  className,
  validators = [],
}) => {
  const dispatch = useDispatch();
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const toggleShowDropdown = () => {
    setIsShowDropdown(!isShowDropdown);
  };

  return (
    <Controller
      name={fieldName}
      rules={{
        validate: {
          validate: (value) => {
            if (validators.length >= 1) {
              return validateForm(value, validators);
            }
          },
        },
      }}
      render={({ field: { onChange, value = [] }, fieldState: { error } }) => {
        const onChangeValue = (selectedValue) => {
          const valueExisted = value.indexOf(selectedValue);

          if (valueExisted === -1) {
            onChange([...value, selectedValue]);
          } else {
            onChange(value.filter((item) => item !== selectedValue));
          }

          dispatch(handleOnChange(selectedValue));
        };

        return (
          <div className={`multiple__select-form ${className}`}>
            <label className="form-input__label" htmlFor={htmlFor}>
              {label}
            </label>

            <div
              onClick={toggleShowDropdown}
              className="form-input__input multiple__select-select"
            >
              {value.length > 0 ? (
                value.map((value, index) => (
                  <div key={index} className="multiple__select-select__item">
                    {value}
                    <FontAwesomeIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        onChangeValue(value);
                      }}
                      className="multiple__select-select__icon"
                      icon={faClose}
                    />
                  </div>
                ))
              ) : (
                <span style={{ color: "var(--color-grey-dark-2)" }}>
                  {placeholder}
                </span>
              )}
            </div>
            {error &&
              <div className="alert alert-danger">
                {error.message}
              </div>
            }

            <div
              className={`multiple__select-dropdown ${isShowDropdown ? "active" : ""
                }`}
            >
              {data.map((item, index) => (
                <div
                  onClick={() => onChangeValue(item[propName])}
                  key={index}
                  className={`multiple__select-dropdown__item ${value.indexOf(item[propName]) === -1 ? "" : "active"
                    }`}
                >
                  <FontAwesomeIcon
                    className="multiple__select-dropdown__icon"
                    icon={faCheck}
                  />

                  <span className="multiple__select-dropdown__text">
                    {item[propName]}
                  </span>
                </div>
              ))}

              {/* Place for Component Add More Attribute */}
              {componentAddNew && (
                <>
                  {componentAddNew}

                  {componentSubData}
                </>
              )}
              {/* Place for Component Add More Attribute */}
            </div>
          </div>
        );
      }}
    />
  );
};

export default MultipleSelectFields;
