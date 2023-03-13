import "./ProductDetail.scss";

import { productImages } from "../../../assets/image/product";
import { Breadcrumbs } from "../../../shared/components";
import SwiperSlider from "../../../shared/components/SwiperSlider/SwiperSlider";
import { Header } from "../../../shared/Layouts";
import ProductDetailInfo from "../../components/product-detail/ProductDetailInfo";

const ProductDetail = () => {
  return (
    <>
      <Header />

      <Breadcrumbs title="Ad Details" nextPages={["Home"]} />

      <div className="product-detail">
        <div className="container">
          <div className="row wide product-detail__container">
            <div className="col-6">
              <SwiperSlider images={productImages} />
            </div>

            <div className="col-6">
              <div className="product-detail__info">
                <ProductDetailInfo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
