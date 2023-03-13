import './ProductDetailInfo.scss'

import { memo } from "react";

const ProductDetailInfo = (props) => {
  return (
    <div className="product-info">
      <div className="product-info__header">
        <h3 className="product-info__name">Macbook Pro 13-inch</h3>

        <p className="product-info__price">$5</p>
      </div>

      <div className="product-info__body">
        <h4>Informations</h4>

        <div className="product-info__body">
            
        </div>
      </div>
    </div>
  );
};

export default memo(ProductDetailInfo);