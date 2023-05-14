import classes from "./FormAddCategorization.module.scss";
import React, { memo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";

import {
  handleOnChangeColorName,
  handleOnChangeSizeName,
  toggleShowAddForm,
  toggleShowFormSize,
} from "../../../../redux/slices/seller/product-categorization/productCategorizationSlice";
import {
  ButtonFields,
} from "../../../../shared/FormElement";
import CategorizationTable from "../CategorizationTable/CategorizationTable";

const FormAddCategorization = () => {
  const dispatch = useDispatch();
  const productCategorizationState = useSelector(
    (state) => state.productCategorization
  );

  return (
    <>
      <div className={classes.formCategorization}>
        <div className={`row align-items-center`}>
          <div className="col-2">
            <h3 className={classes.title}>Categorization 1</h3>
          </div>

          <div className="col-5">
            <input
              onChange={(e) => dispatch(handleOnChangeColorName(e.target.value))}
              className={`${classes.formCategorization__input} form-input__input`}
              placeholder="Example: Color ..."
              type="text"
            />
          </div>

          <FontAwesomeIcon
            onClick={() => dispatch(toggleShowAddForm())}
            className={classes.formCategorization__icon}
            icon={faClose}
          />
        </div>
      </div>

      <div className={`${classes.formCategorization} mt-3`}>
        {!productCategorizationState.isShowFormSize && (
          <ButtonFields
            type="button"
            borderOnly
            className="form-create__categorization"
            onClick={() => dispatch(toggleShowFormSize())}
          >
            <FontAwesomeIcon
              className="form-create__categorization-icon"
              icon={faPlus}
            />
            <span>Add product category group 2</span>
          </ButtonFields>
        )}

        {productCategorizationState.isShowFormSize && (
          <>
            <div className={`row align-items-center`}>
              <div className="col-2">
                <h3 className={classes.title}>Categorization 2</h3>
              </div>

              <div className="col-5">
                <input
                  onChange={(e) => dispatch(handleOnChangeSizeName(e.target.value))}
                  className={`${classes.formCategorization__input} form-input__input`}
                  placeholder="Example: Size ..."
                  type="text"
                />
              </div>

              <FontAwesomeIcon
                onClick={() => dispatch(toggleShowFormSize())}
                className={classes.formCategorization__icon}
                icon={faClose}
              />
            </div>
          </>
        )}
      </div>

      <div className="w-100">
        <div className="row mt-3">
          <div className="col-2">
            <h3 className={classes.title}>List Categorization (*)</h3>
          </div>

          <div className="col-12 mt-3">
            <CategorizationTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(FormAddCategorization);
