import React, { useCallback, useEffect, useState } from "react";

import classes from "./ProductDetailInfoBody.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useThunk from "../../../../shared/hooks/useThunk";
import { ButtonQuantity, TagProduct } from "../../../../shared/components";
import { ButtonFields } from "../../../../shared/FormElement";
import {
  fetchColorValuesBySizeValue,
  fetchInventoryDetailByParams,
  fetchSizeValuesByColorValue,
} from "../../../../redux/thunks/inventory/inventoryDetailThunk";
import {
  onSelectColorValue,
  onSelectSizeValue,
} from "../../../../redux/slices/inventory/inventoryDetailSlice";

const ProductDetailInfoBody = ({ productData = null }) => {
  const inventoryDetailState = useSelector((state) => state.inventoryDetail);
  const dispatch = useDispatch();
  const [statusColorValue, setStatusColorValue] = useState(false);
  const [statusSizeValue, setStatusSizeValue] = useState(false);

  const [doFetchSizeValueByColorValue] = useThunk(fetchSizeValuesByColorValue);
  const [doFetchColorValueBySizeValue] = useThunk(fetchColorValuesBySizeValue);
  const [doFetchInventoryDetailByParams] = useThunk(
    fetchInventoryDetailByParams
  );

  const handleSelectColorValue = useCallback(
    (colorValue) => {
      if (colorValue === inventoryDetailState.colorValueSelected) {
        setStatusColorValue(false);
        dispatch(onSelectColorValue(null));
      } else {
        setStatusColorValue(true);
        dispatch(onSelectColorValue(colorValue));
      }

      doFetchSizeValueByColorValue({
        productId: productData.id,
        value: colorValue,
      });
    },
    [
      dispatch,
      doFetchSizeValueByColorValue,
      inventoryDetailState.colorValueSelected,
      productData.id,
    ]
  );

  const handleSelectSizeValue = useCallback(
    (sizeValue) => {
      if (sizeValue === inventoryDetailState.sizeValueSelected) {
        setStatusSizeValue(false);
        dispatch(onSelectSizeValue(null));
      } else {
        setStatusSizeValue(true);
        dispatch(onSelectSizeValue(sizeValue));
      }

      doFetchColorValueBySizeValue({
        productId: productData.id,
        value: sizeValue,
      });
    },
    [
      dispatch,
      doFetchColorValueBySizeValue,
      inventoryDetailState.sizeValueSelected,
      productData.id,
    ]
  );

  useEffect(() => {
    doFetchInventoryDetailByParams({
      productId: productData.id,
      sizeValue: inventoryDetailState.sizeValueSelected,
      colorValue: inventoryDetailState.colorValueSelected,
    });
  }, [
    doFetchInventoryDetailByParams,
    inventoryDetailState.colorValueSelected,
    inventoryDetailState.sizeValueSelected,
    productData.id,
  ]);

  return (
    <div className="product-info__body">
      <h4 className="product-info__text-heading">Information</h4>

      <p className="product-info__sub-info product-info__text-normal mt-4">
        <span className="product-info__text-normal--bold mr-4">Category:</span>
        {productData.categories.map((categoryName, index) => (
          <React.Fragment key={index}>
            {categoryName}
            {index + 1 !== productData.categories.length && ", "}
          </React.Fragment>
        ))}
      </p>

      <p className="product-info__sub-info product-info__text-normal mt-2">
        <span className="product-info__text-normal--bold mr-4">Brand:</span>
        {productData.brandName}
      </p>

      <p className="product-info__sub-info product-info__text-normal mt-2">
        <span className="product-info__text-normal--bold mr-4">
          Product Styles:
        </span>
        {productData.productStyles.map((styleName, index) => (
          <React.Fragment key={index}>
            {styleName}
            {index + 1 !== productData.productStyles.length && ", "}
          </React.Fragment>
        ))}
      </p>
      
      <div className={classes.ProductDetailInfoBodyError}>
        {!!productData.inventory && (
          <>
            <p className="product-info__sub-info product-info__text-normal mt-2">
              <span className="product-info__text-normal--bold mr-4">
                {productData.inventory.colorName}:
              </span>
              {productData.inventory.colorValues.map((color) => (
                <TagProduct
                  isActive={
                    statusColorValue &&
                    inventoryDetailState.colorValueSelected === color
                      ? true
                      : false
                  }
                  onClick={() => {
                    if (
                      !statusSizeValue ||
                      inventoryDetailState.colorValuesData.includes(color)
                    ) {
                      handleSelectColorValue(color);
                    }
                  }}
                  name={color}
                  disabled={
                    statusSizeValue &&
                    !inventoryDetailState.colorValuesData.includes(color)
                  }
                />
              ))}
            </p>

            <p className="product-info__sub-info product-info__text-normal mt-2">
              <span className="product-info__text-normal--bold mr-4">
                {productData.inventory.sizeName}:
              </span>
              {productData.inventory.sizeValues.map((size) => (
                <TagProduct
                  isActive={
                    statusSizeValue &&
                    inventoryDetailState.sizeValueSelected === size
                      ? true
                      : false
                  }
                  onClick={() => {
                    if (
                      !statusColorValue ||
                      inventoryDetailState.sizeValuesData.includes(size)
                    ) {
                      handleSelectSizeValue(size);
                    }
                  }}
                  name={size}
                  disabled={
                    statusColorValue &&
                    !inventoryDetailState.sizeValuesData.includes(size)
                  }
                />
              ))}
            </p>
          </>
        )}

        <p className="product-info__sub-info product-info__text-normal mt-4">
          <span className="product-info__text-normal--bold mr-4">
            Quantity:
          </span>
          <ButtonQuantity quantity={1} />

          <span className="ml-3">
            {inventoryDetailState.inventoryDetailData
              ? inventoryDetailState.inventoryDetailData.quantity
              : !!productData.inventory
              ? productData.inventory.quantity
              : productData.quantity}{" "}
            available products
          </span>
        </p>

        <p className={classes.ProductDetailInfoBodyErrorText}>
          Please choose product categorization
        </p>
      </div>

      <div className="d-flex">
        <ButtonFields className="product-info__btn" primary fullWidth>
          Add To Cart
        </ButtonFields>

        <ButtonFields
          className="product-info__btn"
          primary
          fullWidth
          borderOnly
        >
          <FontAwesomeIcon icon={faBookmark} />
        </ButtonFields>
      </div>
    </div>
  );
};

export default ProductDetailInfoBody;
