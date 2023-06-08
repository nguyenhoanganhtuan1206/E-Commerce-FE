import React, { useCallback, useEffect, useState } from "react";

import "./ProductDetailInfo.scss";
import "../ProductDetail.scss";

import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";

import {
  onSelectColorValue,
  onSelectSizeValue,
} from "../../../../redux/slices/inventory/inventoryDetailSlice";
import {
  fetchInventoryDetailByParams,
  fetchSizeValuesByColorValue,
} from "../../../../redux/thunks/inventory/inventoryDetailThunk";
import { fetchColorValuesBySizeValue } from "../../../../redux/thunks/inventory/inventoryDetailThunk";
import { ButtonQuantity, TagProduct } from "../../../../shared/components";
import ButtonFields from "../../../../shared/FormElement/ButtonFields/ButtonFields";
import useThunk from "../../../../shared/hooks/useThunk";

const ProductDetailInfo = (props) => {
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
        productId: props.productData.id,
        value: colorValue,
      });
    },
    [
      dispatch,
      doFetchSizeValueByColorValue,
      inventoryDetailState.colorValueSelected,
      props.productData.id,
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
        productId: props.productData.id,
        value: sizeValue,
      });
    },
    [
      dispatch,
      doFetchColorValueBySizeValue,
      inventoryDetailState.sizeValueSelected,
      props.productData.id,
    ]
  );

  useEffect(() => {
    doFetchInventoryDetailByParams({
      productId: props.productData.id,
      sizeValue: inventoryDetailState.sizeValueSelected,
      colorValue: inventoryDetailState.colorValueSelected,
    });
  }, [
    doFetchInventoryDetailByParams,
    inventoryDetailState.colorValueSelected,
    inventoryDetailState.sizeValueSelected,
    props.productData.id,
  ]);

  return (
    <div className="product-info">
      <div className="product-info__header">
        <h3 className="product-info__name">{props.productData.name}</h3>

        <p className="product-info__location">
          <FontAwesomeIcon
            className="product-info__location-icon"
            icon={faLocationDot}
          />
          <span>
            {`${props.productData.seller.commune}, ${props.productData.seller.district}, ${props.productData.seller.province}`}
          </span>
        </p>

        <p className="product-info__price">
          {`$${
            inventoryDetailState.inventoryDetailData
              ? inventoryDetailState.inventoryDetailData.price.toFixed(2)
              : !!props.productData.inventory
              ? props.productData.inventory.price.toFixed(2)
              : props.productData.price.toFixed(2)
          }`}
        </p>
      </div>

      <div className="product-info__body">
        <h4 className="product-info__text-heading">Information</h4>

        <p className="product-info__sub-info product-info__text-normal mt-4">
          <span className="product-info__text-normal--bold mr-4">
            Category:
          </span>
          {props.productData.categories.map((categoryName, index) => (
            <React.Fragment key={index}>
              {categoryName}
              {index + 1 !== props.productData.categories.length && ", "}
            </React.Fragment>
          ))}
        </p>

        <p className="product-info__sub-info product-info__text-normal mt-2">
          <span className="product-info__text-normal--bold mr-4">Brand:</span>
          {props.productData.brandName}
        </p>

        <p className="product-info__sub-info product-info__text-normal mt-2">
          <span className="product-info__text-normal--bold mr-4">
            Product Styles:
          </span>
          {props.productData.productStyles.map((styleName, index) => (
            <React.Fragment key={index}>
              {styleName}
              {index + 1 !== props.productData.productStyles.length && ", "}
            </React.Fragment>
          ))}
        </p>

        {!!props.productData.inventory && (
          <>
            <p className="product-info__sub-info product-info__text-normal mt-2">
              <span className="product-info__text-normal--bold mr-4">
                {props.productData.inventory.colorName}:
              </span>
              {props.productData.inventory.colorValues.map((color) => (
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
                {props.productData.inventory.sizeName}:
              </span>
              {props.productData.inventory.sizeValues.map((size) => (
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
              : !!props.productData.inventory
              ? props.productData.inventory.quantity
              : props.productData.quantity}{" "}
            available products
          </span>
        </p>

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
    </div>
  );
};

export default ProductDetailInfo;
