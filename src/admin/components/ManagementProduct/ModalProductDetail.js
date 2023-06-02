import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./ModalProductDetail.module.scss";

import useThunk from "../../../shared/hooks/useThunk";
import { fetchProductById } from "../../../redux/thunks/seller/product/productThunk";
import { Modal, TagProduct } from "../../../shared/components";
import { ButtonFields } from "../../../shared/FormElement";
import { toggleShowModalUpdate } from "../../../redux/slices/commonSlices.js/commoneSlice";
import CardPaymentMethodPattern from "../../../shared/FormElement/CardPaymentMethod/CardPaymentMethodPattern";
import { useFetchFilesFirebase } from "../../../firebase/image-product/firebase-service";

const ModalProductDetail = () => {
  const dispatch = useDispatch();
  const modalProductState = useSelector((state) => state.commonSlice);
  const productDetailState = useSelector((state) => state.myAds);

  const [imagesProduct, setImagesProduct] = useState(new Map());

  const [handleFetchFiles] = useFetchFilesFirebase();

  const [doFetchProductById, isLoadingFetchProductById] =
    useThunk(fetchProductById);

  useEffect(() => {
    if (modalProductState.idParams) {
      doFetchProductById(modalProductState.idParams);
      handleFetchFiles(modalProductState.idParams)
        .then((res) => {
          const map = new Map();
          res.imagesProduct.forEach((item) => {
            map.set(item.fileName, item.url);
          });
          setImagesProduct(map);
        })
        .catch(() => {});
    }
  }, [doFetchProductById, handleFetchFiles, modalProductState.idParams]);

  return (
    <>
      <Modal
        onCancel={() => dispatch(toggleShowModalUpdate())}
        show={modalProductState.isShowModalUpdate && !isLoadingFetchProductById}
        className="user-location__form-modal"
        header={
          <h3 className="modal-seller__form-title text-center">
            Approval Product
          </h3>
        }
        footer={
          <div className="d-flex justify-content-center">
            <ButtonFields
              type="button"
              onClick={() => dispatch(toggleShowModalUpdate())}
              borderOnly
            >
              Cancel
            </ButtonFields>

            <ButtonFields
              type="button"
              // onClick={() => {
              //   setShowModal(false);
              //   setShowModalFeedback(true);
              // }}
              className="ml-5"
              subPrimary
            >
              Feedback
            </ButtonFields>

            <ButtonFields
              type="button"
              // onClick={handleApproveRequest}
              // isLoading={approvalSellerResults.isLoading}
              className="ml-5"
              primary
            >
              Approval Request
            </ButtonFields>
          </div>
        }
      >
        {!isLoadingFetchProductById && productDetailState.productData && (
          <div className="modal-seller__detail">
            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Owner Name:</h3>
              <span className="modal-seller__detail-text">
                {productDetailState.productData.seller.sellerName}
              </span>
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Product Name:</h3>
              <span className="modal-seller__detail-text">
                {productDetailState.productData.name}
              </span>
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Categories :</h3>
              {productDetailState.productData.categories.map(
                (categoryName, index) => (
                  <TagProduct key={index} name={categoryName} />
                )
              )}
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Variant Name :</h3>
              <span className="modal-seller__detail-text">
                {productDetailState.productData.variantName}
              </span>
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Product Styles :</h3>
              {productDetailState.productData.productStyles.map(
                (productStyle, index) => (
                  <TagProduct key={index} name={productStyle} />
                )
              )}
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Inventories :</h3>
              {productDetailState.productData.inventories.map(
                (inventory, index) => (
                  <TagProduct
                    key={index}
                    name={inventory.colorValue}
                    extraInformation={
                      <>
                        <p className="mb-1">
                          <span>Price: </span>${inventory.price.toFixed(2)}
                        </p>
                        <p className="m-0">
                          <span>Quantity: </span>
                          {inventory.quantity}
                        </p>
                      </>
                    }
                  />
                )
              )}
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Payment Methods :</h3>
              {productDetailState.productData.paymentMethods.map(
                (paymentMethodName, index) => (
                  <CardPaymentMethodPattern
                    fieldName={paymentMethodName}
                    className="mr-2"
                    imgSrc={
                      paymentMethodName === "COD"
                        ? "https://www.coolmate.me/images/COD.svg"
                        : "https://cdn-icons-png.flaticon.com/512/174/174861.png"
                    }
                    title={
                      paymentMethodName === "COD"
                        ? "Cash On Delivery"
                        : "Payment With Paypal"
                    }
                    subTitle={
                      paymentMethodName === "COD" &&
                      "Payment when received your order"
                    }
                  />
                )
              )}
            </div>

            <div className="mt-3">
              <h3 className="modal-seller__detail-title">Images Product :</h3>

              <div className={classes.ModalProductDetail__ImagesProduct}>
                {Array.from(imagesProduct.values()).map((url, index) => {
                  return (
                    <img
                      className={classes.ModalProductDetail__Image}
                      key={index}
                      src={url}
                      alt={url}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default memo(ModalProductDetail);
