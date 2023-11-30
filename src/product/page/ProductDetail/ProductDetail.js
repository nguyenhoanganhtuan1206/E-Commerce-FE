import "./ProductDetail.scss";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import useThunk from "../../../shared/hooks/useThunk";
import { fetchProductDetailById } from "../../../redux/thunks/seller/product/productThunk";
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
  const productDetailState = useSelector((state) => state.commonProduct);

  const [doFetchProductDetailById] = useThunk(fetchProductDetailById);
  
  useEffect(() => {
    if (params.productId) {
      doFetchProductDetailById(params.productId);
    }
  }, [doFetchProductDetailById, params.productId]);

  return (
    <>
      {productDetailState.isLoading && <LoadingSpinner option1 />}

      {!productDetailState.isLoading &&
        productDetailState.productDetailData && (
          <>
            <Header />

            <Breadcrumbs
              currentPage="Ad Details"
              nextPages={[{ title: "Home", link: "/" }]}
            />

            <div className="product-detail">
              <div className="container">
                <div className="row wide product-detail__container">
                  <div className="col-6">
                    <SwiperSlider images={imagesLink} />
                  </div>

                  <div className="col-6">
                    <div className="product-detail__info">
                      <ProductDetailInfo
                        sellerId={
                          productDetailState.productDetailData.seller.id
                        }
                        productData={productDetailState.productDetailData}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Detail Section */}
              <ProductDetailsSection
                productData={productDetailState.productDetailData}
              />
              {/* Product Detail Section */}

              {/* Product Comments Section */}
              <CommentsProduct
                infoProduct={productDetailState.productDetailData}
              />
              {/* Product Comments Section */}
            </div>
          </>
        )}
    </>
  );
};

export default ProductDetail;
