import React from "react";

import "./ProductDetailInfo.scss";
import "../ProductDetail.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";

import { TagProduct } from "../../../../shared/components";
import ButtonFields from "../../../../shared/FormElement/ButtonFields/ButtonFields";

const ProductDetailInfo = (props) => {
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
            !!props.productData.inventory
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
                <TagProduct name={color} />
              ))}
            </p>

            <p className="product-info__sub-info product-info__text-normal mt-2">
              <span className="product-info__text-normal--bold mr-4">
                {props.productData.inventory.sizeName}:
              </span>
              {props.productData.inventory.sizeValues.map((size) => (
                <TagProduct name={size} />
              ))}
            </p>
          </>
        )}

        <p className="product-info__sub-info product-info__text-normal mt-4">
          <span className="product-info__text-normal--bold mr-4">
            Quantity:
          </span>
          {!!props.productData.inventory
            ? props.productData.inventory.quantity
            : props.productData.quantity} available products
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
