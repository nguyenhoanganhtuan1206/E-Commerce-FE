import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./ProductDetailInfoBody.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useThunk from "../../../../shared/hooks/useThunk";
import { useAddToCartMutation } from "../../../../redux/apis/cart/cart.api";
import { AuthContext } from "../../../../context/auth-context";
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
  resetInventoryData,
} from "../../../../redux/slices/inventory/inventoryDetailSlice";
import {
  setCartQuantity,
  toggleDecreaseQuantity,
  toggleIncreaseQuantity,
} from "../../../../redux/slices/cart/cartSlice";

const ProductDetailInfoBody = ({ productData = null }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const dispatch = useDispatch();
  const inventoryDetailState = useSelector((state) => state.inventoryDetail);
  const quantityCartState = useSelector((state) => state.cartSlice);
  const cartQuantityState = useSelector((state) => state.cartSlice);

  const [statusColorValue, setStatusColorValue] = useState(false);
  const [statusSizeValue, setStatusSizeValue] = useState(false);
  const [isEmptyCart, setIsEmptyCart] = useState(false);

  const [doFetchSizeValueByColorValue] = useThunk(fetchSizeValuesByColorValue);
  const [doFetchColorValueBySizeValue] = useThunk(fetchColorValuesBySizeValue);
  const [doFetchInventoryDetailByParams] = useThunk(
    fetchInventoryDetailByParams
  );

  const [addToCart, addToCartResults] = useAddToCartMutation();

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

  const handleFetchInventoryDetailByParams = useCallback(() => {
    if (
      inventoryDetailState.sizeValueSelected &&
      inventoryDetailState.colorValueSelected
    ) {
      doFetchInventoryDetailByParams({
        productId: productData.id,
        sizeValue: inventoryDetailState.sizeValueSelected,
        colorValue: inventoryDetailState.colorValueSelected,
      });
    }
  }, [
    doFetchInventoryDetailByParams,
    inventoryDetailState.colorValueSelected,
    inventoryDetailState.sizeValueSelected,
    productData.id,
  ]);

  const handleDecreaseQuantity = () => {
    if (cartQuantityState.quantity === 1) {
      return;
    }

    dispatch(toggleDecreaseQuantity());
  };

  const handleIncreaseQuantity = () => {
    const maxQuantity = inventoryDetailState.inventoryDetailData
      ? inventoryDetailState.inventoryDetailData.quantity
      : 0;

    if (cartQuantityState.quantity === maxQuantity) {
      return;
    }

    dispatch(toggleIncreaseQuantity());
  };

  const userLoggedIn = () => {
    if (!authContext.isLoggedIn) {
      navigate("/login");
    }
  };

  const handleAddProductToCart = () => {
    userLoggedIn();
    if (
      productData.inventory &&
      (!inventoryDetailState.colorValueSelected ||
        !inventoryDetailState.sizeValueSelected)
    ) {
      setIsEmptyCart(true);
      return;
    }

    if (productData.inventory) {
      addToCart({
        inventoryId: inventoryDetailState.inventoryDetailData.id,
        quantity: quantityCartState.quantity,
      })
        .unwrap()
        .then(() => {
          toast.success("Added this product to your cart successfully", {
            autoClose: 2000,
          });

          setStatusColorValue(false);
          setStatusSizeValue(false);
          dispatch(resetInventoryData());
          dispatch(setCartQuantity(1));
        })
        .catch((error) => toast.error(error.data.message));
      setIsEmptyCart(false);
    } else {
      addToCart({
        productId: productData.id,
        quantity: quantityCartState.quantity,
      })
        .unwrap()
        .then(() => {
          toast.success("Added this product to your cart successfully", {
            autoClose: 2000,
          });

          dispatch(resetInventoryData());
          dispatch(setCartQuantity(1));
        })
        .catch((error) => toast.error(error.data.message));
    }
  };

  const handleCartQuantityWithInventoryDetails = useCallback(() => {
    const maxQuantity = inventoryDetailState.inventoryDetailData
      ? inventoryDetailState.inventoryDetailData.quantity
      : 0;

    if (
      inventoryDetailState.inventoryDetailData &&
      cartQuantityState.quantity > maxQuantity
    ) {
      dispatch(
        setCartQuantity(inventoryDetailState.inventoryDetailData.quantity)
      );
      return;
    }
  }, [
    cartQuantityState.quantity,
    dispatch,
    inventoryDetailState.inventoryDetailData,
  ]);

  const handleCartQuantityWithoutInventory = useCallback(() => {
    // !TODO: do some logic with this case
  }, []);

  useEffect(() => {
    handleCartQuantityWithInventoryDetails();

    //! TODO: fetch with quantity product without inventory
  }, [handleCartQuantityWithInventoryDetails]);

  useEffect(() => {
    dispatch(resetInventoryData());
    dispatch(setCartQuantity(1));
  }, [dispatch]);

  useEffect(() => {
    handleFetchInventoryDetailByParams();
  }, [handleFetchInventoryDetailByParams]);

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

      <div className={isEmptyCart && classes.ProductDetailInfoBodyError}>
        {!!productData.inventory && (
          <>
            <div className="product-info__sub-info product-info__text-normal mt-2">
              <span className="product-info__text-normal--bold mr-4">
                {productData.inventory.colorName}:
              </span>
              {productData.inventory.colorValues.map((color, index) => (
                <TagProduct
                  key={index}
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
            </div>

            <div className="product-info__sub-info product-info__text-normal mt-2">
              <span className="product-info__text-normal--bold mr-4">
                {productData.inventory.sizeName}:
              </span>
              {productData.inventory.sizeValues.map((size, index) => (
                <TagProduct
                  key={index}
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
            </div>
          </>
        )}

        <div className="product-info__sub-info product-info__text-normal mt-4">
          <span className="product-info__text-normal--bold mr-4">
            Quantity:
          </span>
          <ButtonQuantity
            currentQuantity={cartQuantityState.quantity}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
          />

          <span className="ml-3">
            {inventoryDetailState.inventoryDetailData
              ? inventoryDetailState.inventoryDetailData.quantity
              : !!productData.inventory
              ? productData.inventory.quantity
              : productData.quantity}{" "}
            available products
          </span>
        </div>

        {isEmptyCart && (
          <p className={classes.ProductDetailInfoBodyErrorText}>
            Please choose product categorization
          </p>
        )}
      </div>

      <div className="d-flex">
        <ButtonFields
          onClick={handleAddProductToCart}
          className="product-info__btn"
          primary
          fullWidth
          isLoading={addToCartResults.isLoading}
        >
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
