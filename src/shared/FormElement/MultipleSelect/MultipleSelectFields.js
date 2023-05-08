import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  handleSelectValues,
  toggleShowDropdown,
} from "../../../redux/slices/FormElement/MultipleSelect/multipleSelectSlices";

import "./MultipleSelectFields.scss";

/**
 *
 * @propName :used for get data from Object. For example: categories[propName] => categories.name
 */

const MultipleSelectFields = ({
  data = [],
  propName,
  placeholder,
  label,
  htmlFor,
}) => {
  const multipleSelectState = useSelector((state) => state.multipleSelect);
  const dispatch = useDispatch();

  const handleOnChange = useCallback(
    (value) => {
      dispatch(handleSelectValues(value));
    },
    [dispatch]
  );

  return (
    <div className="multiple__select-form">
      <label className="form-input__label" htmlFor={htmlFor}>
        {/* {label} */}
        Multiple select
      </label>

      <div
        onClick={() => dispatch(toggleShowDropdown())}
        className="form-input__input multiple__select-select"
      >
        {/* {placeholder} */}
        {multipleSelectState.selectedValues.length > 0
          ? multipleSelectState.selectedValues.map((value, index) => (
              <div key={index} className="multiple__select-select__item">
                {value}
                <FontAwesomeIcon
                  onClick={() => handleOnChange(value)}
                  className="multiple__select-select__icon"
                  icon={faClose}
                />
              </div>
            ))
          : "SELECT SOMETHING..."}
      </div>

      <div
        className={`multiple__select-dropdown ${
          multipleSelectState.isShowDropdown ? "active" : ""
        }`}
      >
        {data.map((item, index) => (
          <div
            onClick={() => handleOnChange(item[propName])}
            key={index}
            className={`multiple__select-dropdown__item ${
              multipleSelectState.selectedValues.indexOf(item[propName]) === -1
                ? ""
                : "active"
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
      </div>
    </div>
  );
};

export default MultipleSelectFields;
