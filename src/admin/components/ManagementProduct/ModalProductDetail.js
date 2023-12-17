import { toast } from "react-toastify";

import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";

import classes from "./ModalProductDetail.module.scss";

import useThunk from "../../../shared/hooks/useThunk";
import { fetchProductById } from "../../../redux/thunks/seller/product/productThunk";
import { Modal, TagProduct } from "../../../shared/components";
import { ButtonFields, InputFields } from "../../../shared/FormElement";
import { toggleShowModalUpdate } from "../../../redux/slices/shared/CommonSlices/commonSlice";
import CardPaymentMethodPattern from "../../../shared/FormElement/CardPaymentMethod/CardPaymentMethodPattern";
import { useFetchFilesFirebase } from "../../../firebase/image-product/firebase-service";
import {
  useApprovalProductMutation,
  useSendFeedbackAboutProductMutation,
} from "../../../redux/apis/admin/product/product.api";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

const ModalProductDetail = () => {
  const dispatch = useDispatch();
  const methods = useForm();

  const [showModalFeedback, setShowModalFeedback] = useState(false);
  const modalProductState = useSelector((state) => state.commonSlice);
  const productDetailState = useSelector((state) => state.myAds);

  const [imagesProduct, setImagesProduct] = useState(new Map());

  const [handleFetchFiles] = useFetchFilesFirebase();

  const [approvalProduct, approvalProductResults] =
    useApprovalProductMutation();
  const [doSendFeedback, sendFeedbackResults] =
    useSendFeedbackAboutProductMutation();
  const [doFetchProductById] = useThunk(fetchProductById);

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

  const handleApprovalProduct = () => {
    if (productDetailState.productData) {
      approvalProduct(productDetailState.productData.id)
        .unwrap()
        .then(() => {
          toast.success("Approved this product successfully!", {
            autoClose: 2000,
          });
          dispatch(toggleShowModalUpdate());
        })
        .catch((error) => toast.error(error.data.message));
    }
  };

  const onSubmit = (data) => {
    if (productDetailState.productData) {
      doSendFeedback({ id: productDetailState.productData.id, data })
        .unwrap()
        .then(() => {
          toast.success("Your feedback has been sent successfully!", {
            autoClose: 2000,
          });

          methods.reset();
          setShowModalFeedback(false);
        })
        .catch((error) => toast.error(error.data.message));
    }
  };

  return (
    <>
      <Modal
        onCancel={() => dispatch(toggleShowModalUpdate())}
        show={modalProductState.isShowModalUpdate}
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
              onClick={() => {
                setShowModalFeedback(true);
                dispatch(toggleShowModalUpdate());
              }}
              className="ml-5"
              subPrimary
            >
              Feedback
            </ButtonFields>

            <ButtonFields
              onClick={handleApprovalProduct}
              type="button"
              className="ml-5"
              isLoading={approvalProductResults.isLoading}
              primary
            >
              Approval Product
            </ButtonFields>
          </div>
        }
      >
        {productDetailState.productData && (
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
              <h3 className="modal-seller__detail-title mr-3">Categories :</h3>
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
              <h3 className="modal-seller__detail-title mr-3">
                Product Styles :
              </h3>
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
                      onClick={() => window.open(url)}
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

      {/* Modal Feedback */}
      {productDetailState.productData && (
        <Modal
          show={showModalFeedback}
          className="user-location__form-modal"
          header={
            <h3 className="modal-seller__form-title text-center">
              Feedback For Product
            </h3>
          }
          footer={
            <div className="d-flex justify-content-center">
              <ButtonFields
                type="button"
                onClick={() => {
                  setShowModalFeedback(false);
                }}
                borderOnly
              >
                Cancel
              </ButtonFields>

              <ButtonFields
                type="button"
                onClick={methods.handleSubmit(onSubmit)}
                isLoading={sendFeedbackResults.isLoading}
                className="ml-5"
                primary
              >
                Send Feedback
              </ButtonFields>
            </div>
          }
        >
          <FormProvider {...methods}>
            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Seller Name:</h3>
              <span className="modal-seller__detail-text">
                {productDetailState.productData.seller.sellerName}
              </span>
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Seller Email:</h3>
              <span className="modal-seller__detail-text">
                {productDetailState.productData.seller.emailSeller}
              </span>
            </div>

            <InputFields
              fieldName="contentFeedback"
              validators={[
                VALIDATOR_REQUIRED("Feedback cannot be empty"),
                VALIDATOR_MINLENGTH(
                  5,
                  "Feedback must be at least 5 characters"
                ),
                VALIDATOR_MAXLENGTH(
                  1000,
                  "Feedback must be less than 1000 characters"
                ),
              ]}
              placeholder="Enter your content feedback"
              type="textarea"
              label="Feedback (*)"
              cols="5"
              rows="10"
              htmlFor="contentFeedback"
            />
          </FormProvider>
        </Modal>
      )}
      {/* ModalFeedback */}
    </>
  );
};

export default memo(ModalProductDetail);
