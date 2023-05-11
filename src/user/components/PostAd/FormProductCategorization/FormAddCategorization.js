import classes from "./FormAddCategorization.module.scss";
import { useCallback } from "react";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import {
  addNewColorValue,
  toggleShowAddForm,
} from "../../../../redux/slices/seller/product-categorization/productCategorizationSlice";
import {
  InputFields,
  MultipleSelectFields,
} from "../../../../shared/FormElement";
import { VALIDATOR_REQUIRED } from "../../../../shared/util/validators";
import FormAddNewAttribute from "../../../../shared/FormElement/MultipleSelect/FormAddNewAttribute";

const FormAddCategorization = () => {
  const dispatch = useDispatch();
  const productCategorizationState = useSelector(
    (state) => state.productCategorization
  );

  const handleAddNewColorValue = useCallback(
    (data, methods) => {
      if (!data) {
        toast.error("You have to enter your data");
        return;
      }
      dispatch(addNewColorValue(data));
      methods.reset();
    },
    [dispatch]
  );

  return (
    <div className={classes.formCategorization}>
      <div className={`row align-items-center`}>
        <div className="col-2">
          <h3 className={classes.title}>Categorization 1</h3>
        </div>

        <div className="col-10">
          <InputFields
            className={classes.formCategorization__input}
            fieldName="colorName"
            validators={[VALIDATOR_REQUIRED("Cannot be empty")]}
            placeholder="Example: Color ..."
            type="type"
            htmlFor="colorName"
          />
        </div>
      </div>

      <div className={`row mt-3`}>
        <div className="col-2">
          <h3 className={classes.title}>Product Categorization</h3>
        </div>

        <div className="col-10">
          <MultipleSelectFields
            fieldName="colorValue"
            data={productCategorizationState.colorValues}
            propName="colorValue"
            placeholder="Example: Red, White ..."
            componentAddNew={
              <FormAddNewAttribute
                fieldName="colorValue"
                onCreateNewAttribute={handleAddNewColorValue}
              />
            }
          />
        </div>
        <FontAwesomeIcon
          onClick={() => dispatch(toggleShowAddForm())}
          className={classes.formCategorization__icon}
          icon={faClose}
        />
      </div>
    </div>
  );
};

export default FormAddCategorization;
