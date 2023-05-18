import "./PostAdStyles.scss";

import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import useThunk from "../../../shared/hooks/useThunk";
import FormAddCategorization from "./FormProductCategorization/FormAddCategorization";
import FormAddNewAttribute from "../../../shared/FormElement/MultipleSelect/FormAddNewAttribute";
import { fetchProductStyles } from "../../../redux/thunks/admin/product-style/productStyleThunk";
import { fetchCategory } from "../../../redux/thunks/admin/category/categoryThunk";
import { LoadingSpinner } from "../../../shared/components";
import { toggleShowAddForm } from "../../../redux/slices/seller/product-categorization/productCategorizationSlice";
import {
  ButtonFields,
  InputFields,
  MultipleSelectFields,
} from "../../../shared/FormElement";
import {
  VALIDATOR_MAX,
  VALIDATOR_MIN,
  VALIDATOR_MIN_LENGTH_ARRAY,
  VALIDATOR_NUMBER,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";
import {
  useFetchProductStylesBySellerIdQuery,
  useDeleteProductStyleMutation,
  useAddProductStyleMutation,
} from "../../../redux/apis/seller/product-style/product-style.api";
import { useController } from "react-hook-form";

const FormAdInfoDetails = () => {

  const dispatch = useDispatch();
  const fetchAllState = useSelector((state) => state.fetchAll);
  const productCategorizationState = useSelector(
    (state) => state.productCategorization
  );

  const [doFetchProductStyles, isLoadingProductStyles] =
    useThunk(fetchProductStyles);
  const [doFetchCategories, isLoadingCategories] = useThunk(fetchCategory);

  const fetchProductStylesState = useFetchProductStylesBySellerIdQuery();
  const [addProductStyle, addProductStyleResults] =
    useAddProductStyleMutation();
  const [doDeleteProductStyle, deleteProductStyleResults] =
    useDeleteProductStyleMutation();

  const isLoading = isLoadingCategories || isLoadingProductStyles;

  const handleAddNewProductStyle = useCallback(
    (data, methods) => {
      addProductStyle(data)
        .unwrap()
        .then(() => {
          methods.reset();
          toast.success("Added new product style for your product successful", {
            autoClose: 2000,
          });
        })
        .catch((error) => toast.error(error.data.message));
    },
    [addProductStyle]
  );

  useEffect(() => {
    doFetchCategories();
    doFetchProductStyles();
  }, [doFetchCategories, doFetchProductStyles]);

  return (
    <>
      {isLoading && <LoadingSpinner option1 />}

      <div className="row mt-4">
        <div className="col-6">
          <MultipleSelectFields
            fieldName="categories"
            data={fetchAllState.categories.data}
            propName="categoryName"
            label="Categories*"
            addNew
            validators={[
              VALIDATOR_MIN_LENGTH_ARRAY(1, "Must be choose at least category")
            ]}
          />
        </div>

        <div className="col-6">
          <MultipleSelectFields
            fieldName="productStyles"
            data={fetchAllState.productStyles.data}
            propName="name"
            label="Product Styles*"
            componentSubData
            customizeData={fetchProductStylesState.data}
            customizeIsFetching={fetchProductStylesState.isFetching}
            customizeOnDelete={doDeleteProductStyle}
            componentAddNew={
              <FormAddNewAttribute
                fieldName="name"
                onCreateNewAttribute={handleAddNewProductStyle}
              />
            }
            validators={[
              VALIDATOR_MIN_LENGTH_ARRAY(1, "Must be choose at least style")
            ]}
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-4">
          <label className="form-input__label">Product Categorization</label>

          {!productCategorizationState.isShowForm && (
            <ButtonFields
              type="button"
              borderOnly
              className="form-create__categorization"
              onClick={() => dispatch(toggleShowAddForm())}
            >
              <FontAwesomeIcon
                className="form-create__categorization-icon"
                icon={faPlus}
              />
              <span>Add product category group</span>
            </ButtonFields>
          )}
        </div>

        {productCategorizationState.isShowForm && <FormAddCategorization />}

        {!productCategorizationState.isShowForm && (
          <>
            <div className="col-4">
              <InputFields
                fieldName="price"
                validators={[
                  VALIDATOR_REQUIRED("Price cannot be empty"),
                  VALIDATOR_NUMBER("Price is invalid"),
                  VALIDATOR_MIN(5, "Price must be at least $5"),
                  VALIDATOR_MAX(1000000, "Price must be less than $1000000"),
                ]}
                placeholder="Enter Price"
                type="number"
                label="Price (*)"
                htmlFor="price"
              />
            </div>

            <div className="col-4">
              <InputFields
                fieldName="quantity"
                validators={[
                  VALIDATOR_MAX(10000, "Quantity cannot large than 10000 unit"),
                ]}
                placeholder="Enter quantity"
                type="number"
                label="Quantity (*)"
                htmlFor="quantity"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FormAdInfoDetails;
