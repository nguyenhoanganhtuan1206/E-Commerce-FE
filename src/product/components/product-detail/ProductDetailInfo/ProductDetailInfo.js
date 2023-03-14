import "./ProductDetailInfo.scss";
import "../ProductDetail.scss";

import { memo } from "react";
import ButtonFields from "../../../../shared/FormElement/ButtonFields/ButtonFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const ProductDetailInfo = (props) => {
  return (
    <div className="product-info">
      <div className="product-info__header">
        <h3 className="product-info__name">Macbook Pro 13-inch</h3>

        <p className="product-info__location">
          <FontAwesomeIcon
            className="product-info__location-icon"
            icon={faLocationDot}
          />
          <span>VietNam, Da Nang</span>
        </p>

        <p className="product-info__price">$5</p>
      </div>

      <div className="product-info__body">
        <h4 className="product-info__text-heading">Information</h4>

        <p className="product-info__sub-info product-info__text-normal mt-4">
          <span className="product-info__text-normal--bold mr-4">
            Category:
          </span>
          Macbook Pro
        </p>

        <p className="product-info__sub-info product-info__text-normal mt-2">
          <span className="product-info__text-normal--bold mr-4">
            Condition:
          </span>
          Macbook Pro
        </p>

        <p className="product-info__sub-info product-info__text-normal mt-2">
          <span className="product-info__text-normal--bold mr-4">Brand:</span>
          Macbook Pro
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

export default memo(ProductDetailInfo);
