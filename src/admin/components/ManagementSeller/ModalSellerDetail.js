import { memo, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { LoadingSpinner, Modal } from "../../../shared/components";
import { ButtonFields, InputFields } from "../../../shared/FormElement";
import { useSellerApis } from "../../../apis/seller/seller-admin.api";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";
import { formatDateTime } from "../../../shared/util/format-date";

const ModalSellerDetail = ({ sellerId, showModal, setShowModal }) => {
  const methods = useForm({ mode: "all" });

  const { getSellerById, sendFeedbackToUser } = useSellerApis();

  const [seller, setSeller] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [showModalFeedBack, setShowModalFeedback] = useState(false);

  const onSubmit = (data) => {};

  const onSubmitFeedback = useCallback(
    async (data) => {
      setIsLoadingButton(true);
      try {
        const response = await sendFeedbackToUser(data, sellerId);

        toast.success("Your feedback has been sent successfully", {
          autoClose: 2000,
        });

        setShowModalFeedback(false);
        methods.reset();
      } catch (err) {
        toast.error(err);
      } finally {
        setIsLoadingButton(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sellerId, sendFeedbackToUser]
  );

  const fetchSeller = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getSellerById(sellerId);

      setSeller(response);
      setShowModalFeedback(false);
    } catch (err) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellerId, getSellerById]);

  useEffect(() => {
    fetchSeller();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner option1 />}

      {/* MODAL DETAIL */}
      {!isLoading && !!seller && (
        <Modal
          onSubmit={methods.handleSubmit(onSubmit)}
          onCancel={() => setShowModal(false)}
          show={showModal}
          className="user-location__form-modal"
          header={
            <h3 className="modal-seller__form-title text-center">
              Approval Seller
            </h3>
          }
          footer={
            <div className="d-flex justify-content-center">
              <ButtonFields
                type="button"
                onClick={() => setShowModal(false)}
                borderOnly
              >
                Cancel
              </ButtonFields>

              <ButtonFields
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setShowModalFeedback(true);
                }}
                isLoading={isLoading}
                className="ml-5"
                subPrimary
              >
                Feedback
              </ButtonFields>

              <ButtonFields
                type="button"
                onClick={methods.handleSubmit(onSubmit)}
                isLoading={isLoading}
                className="ml-5"
                primary
              >
                Approval Request
              </ButtonFields>
            </div>
          }
        >
          <div className="modal-seller__detail">
            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Seller Name:</h3>
              <span className="modal-seller__detail-text">
                {seller.sellerName}
              </span>
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Seller Email:</h3>
              <span className="modal-seller__detail-text">
                {seller.emailSeller}
              </span>
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Seller Address:</h3>
              <span className="modal-seller__detail-text">
                {seller.address}
              </span>
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Location Detail:</h3>
              <span className="modal-seller__detail-text">
                {seller.city}, {seller.district}, {seller.commune}
              </span>
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Phone Number:</h3>
              <span className="modal-seller__detail-text">
                {seller.phoneNumber}
              </span>
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Created At:</h3>
              <span className="modal-seller__detail-text">
                {formatDateTime(seller.createdAt)}
              </span>
            </div>
          </div>
        </Modal>
      )}
      {/* MODAL DETAIL */}

      {/* MODAL FEEDBACK */}
      {!!seller && (
        <Modal
          onSubmit={methods.handleSubmit(onSubmit)}
          show={showModalFeedBack}
          className="user-location__form-modal"
          header={
            <h3 className="modal-seller__form-title text-center">
              Feedback For Seller
            </h3>
          }
          footer={
            <div className="d-flex justify-content-center">
              <ButtonFields
                type="button"
                onClick={() => {
                  setShowModalFeedback(false);
                  setShowModal(true);
                }}
                borderOnly
              >
                Cancel
              </ButtonFields>

              <ButtonFields
                type="button"
                onClick={methods.handleSubmit(onSubmitFeedback)}
                isLoading={isLoadingButton}
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
                {seller.sellerName}
              </span>
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Seller Email:</h3>
              <span className="modal-seller__detail-text">
                {seller.emailSeller}
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
      {/* MODAL FEEDBACK */}
    </>
  );
};

export default memo(ModalSellerDetail);
