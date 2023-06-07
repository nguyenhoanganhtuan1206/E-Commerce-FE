import "./ProductDetail.scss";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import useThunk from "../../../shared/hooks/useThunk";
import { fetchProductById } from "../../../redux/thunks/seller/product/productThunk";
import { Breadcrumbs, LoadingSpinner } from "../../../shared/components";
import SwiperSlider from "../../../shared/components/SwiperSlider/SwiperSlider";
import { Header } from "../../../shared/Layouts";
import {
  ProductDetailInfo,
  ProductDetailsSection,
  CommentsProduct,
} from "../../components/";

const imagesLink = [
  "https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const ProductDetail = () => {
  const params = useParams();
  const productDetailState = useSelector((state) => state.myAds);

  const [doFetchProductById, isLoadingFetchProductById] =
    useThunk(fetchProductById);

  useEffect(() => {
    if (params.productId) {
      doFetchProductById(params.productId);
    }
  }, [doFetchProductById, params.productId]);

  return (
    <>
      {productDetailState.isLoading && <LoadingSpinner option1 />}

      {!productDetailState.isLoading && productDetailState.productData && (
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
                    <ProductDetailInfo
                      productData={productDetailState.productData}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Detail Section */}
            <ProductDetailsSection
              productData={productDetailState.productData}
            />
            {/* Product Detail Section */}

            {/* Product Comments Section */}
            <CommentsProduct infoProduct={productDetailState.productData} />
            {/* Product Comments Section */}
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetail;
