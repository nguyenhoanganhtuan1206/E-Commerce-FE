import "./ProductDetail.scss";

import { Breadcrumbs } from "../../../shared/components";
import SwiperSlider from "../../../shared/components/SwiperSlider/SwiperSlider";
import { Header } from "../../../shared/Layouts";
import { ProductDetailInfo, ProductDetailsSection } from "../../components/";

const imagesLink = [
  "https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const ProductDetail = () => {
  return (
    <>
      <Header />

      <Breadcrumbs title="Ad Details" nextPages={["Home"]} />

      <div className="product-detail">
        <div className="container">
          <div className="row wide product-detail__container">
            <div className="col-6">
              <SwiperSlider images={imagesLink} />
            </div>

            <div className="col-6">
              <div className="product-detail__info">
                <ProductDetailInfo />
              </div>
            </div>
          </div>
        </div>
        <ProductDetailsSection />
      </div>
    </>
  );
};

export default ProductDetail;
