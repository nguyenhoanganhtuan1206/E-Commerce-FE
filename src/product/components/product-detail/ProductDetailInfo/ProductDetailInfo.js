import "./ProductDetailInfo.scss";
import "../ProductDetail.scss";

import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import ProductDetailInfoBody from "./ProductDetailInfoBody";

const ProductDetailInfo = (props) => {
  const inventoryDetailState = useSelector((state) => state.inventoryDetail);

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

      <ProductDetailInfoBody
        sellerId={props.sellerId}
        productData={props.productData}
      />
    </div>
  );
};

export default ProductDetailInfo;
