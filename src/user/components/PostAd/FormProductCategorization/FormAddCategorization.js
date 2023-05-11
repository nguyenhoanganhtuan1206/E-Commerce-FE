import classes from "./FormAddCategorization.module.scss";
import { useCallback, useState } from "react";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";

import FormAddNewAttribute from "../../../../shared/FormElement/MultipleSelect/FormAddNewAttribute";
import {
  addNewColorValue,
  addNewSizeValue,
  toggleShowAddForm,
} from "../../../../redux/slices/seller/product-categorization/productCategorizationSlice";
import {
  ButtonFields,
  InputFields,
  MultipleSelectFields,
} from "../../../../shared/FormElement";

const FormAddCategorization = () => {
  const dispatch = useDispatch();
  const productCategorizationState = useSelector(
    (state) => state.productCategorization
  );

  const [isShowFormSize, setIsShowFormSize] = useState(false);

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

  const handleAddNewSizeValue = useCallback(
    (data, methods) => {
      if (!data) {
        toast.error("You have to enter your data");
        return;
      }
      dispatch(addNewSizeValue(data));
      methods.reset();
    },
    [dispatch]
  );

  return (
    <>
      <div className={classes.formCategorization}>
        <div className={`row align-items-center`}>
          <div className="col-2">
            <h3 className={classes.title}>Categorization 1</h3>
          </div>

          <div className="col-10">
            <InputFields
              className={classes.formCategorization__input}
              fieldName="colorName"
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
              className={classes.formCategorization__input}
              fieldName="colorValue"
              propName="colorValue"
              data={productCategorizationState.colorValues}
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

      <div className={classes.formCategorization}>
        {!isShowFormSize && (
          <ButtonFields
            type="button"
            borderOnly
            className="form-create__categorization"
            onClick={() => setIsShowFormSize(true)}
          >
            <FontAwesomeIcon
              className="form-create__categorization-icon"
              icon={faPlus}
            />
            <span>Add product category group 2</span>
          </ButtonFields>
        )}

        {isShowFormSize && (
          <>
            <div className={`row align-items-center`}>
              <div className="col-2">
                <h3 className={classes.title}>Categorization 2</h3>
              </div>

              <div className="col-10">
                <InputFields
                  className={classes.formCategorization__input}
                  fieldName="colorName"
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
                  className={classes.formCategorization__input}
                  fieldName="sizeValue"
                  propName="sizeValue"
                  data={productCategorizationState.sizeValues}
                  placeholder="Example: S, M, L ..."
                  componentAddNew={
                    <FormAddNewAttribute
                      fieldName="sizeValue"
                      onCreateNewAttribute={handleAddNewSizeValue}
                    />
                  }
                />
              </div>
              <FontAwesomeIcon
                onClick={() => setIsShowFormSize(false)}
                className={classes.formCategorization__icon}
                icon={faClose}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FormAddCategorization;
