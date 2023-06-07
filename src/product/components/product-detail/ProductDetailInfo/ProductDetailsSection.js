import "./ProductDetailInfo.scss";
import "../ProductDetail.scss";

import AuthorDetailSection from "./AuthorDetailSection";

/**
 * ? Component for Description and Author Information
 */
const ProductDetailsSection = (props) => {
  return (
    <>
      {props.productData && (
        <div className="container mt-5">
          <div className="row">
            <div className="col-8 m-0">
              <div className="product-detail__card">
                <h4 className="product-info__text-heading">Description</h4>

                <p className="product-info__text-normal mt-2">
                  {props.productData.description}
                </p>
              </div>
            </div>
            <div className="col-4">
              <div className="product-detail__card">
                <AuthorDetailSection authorData={props.productData.seller} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailsSection;
