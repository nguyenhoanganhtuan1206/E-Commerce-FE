import { memo, useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { formatDateTime } from "../../../shared/util/format-date";
import {
  useApprovalSellerRequestMutation,
  useFetchSellerByIdQuery,
  useSendFeedbackMutation,
} from "../../../redux/apis/user/seller/seller-register.api";
import { LoadingSpinner, Modal } from "../../../shared/components";
import { ButtonFields, InputFields } from "../../../shared/FormElement";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

const ModalSellerDetail = ({ sellerId, showModal, setShowModal }) => {
  const methods = useForm({ mode: "all" });

  const sellerDetail = useFetchSellerByIdQuery(sellerId);
  const [sendFeedback, sendFeedbackResults] = useSendFeedbackMutation();
  const [approvalSeller, approvalSellerResults] =
    useApprovalSellerRequestMutation();

  const [showModalFeedBack, setShowModalFeedback] = useState(false);

  const handleApproveRequest = useCallback(() => {
    approvalSeller(sellerId)
      .unwrap()
      .then(() => {
        toast.success(
          `You have allowed account ${sellerDetail.data.sellerName} to become a seller`
        );
        setShowModal(false);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellerId, sellerDetail]);

  const onSubmitFeedback = useCallback(
    (data) => {
      sendFeedback({ sellerId, data })
        .unwrap()
        .then(() => {
          toast.success("Your feedback has been sent successfully!", {
            autoClose: 2000,
          });

          methods.reset();
          setShowModalFeedback(false);
        })
        .catch((error) => toast.error(error.data.message));
    },
    [methods, sellerId, sendFeedback]
  );

  return (
    <>
      {sellerDetail.isLoading && <LoadingSpinner option1 />}

      {/* MODAL DETAIL */}
      {!!sellerDetail.data && !sellerDetail.isLoading && (
        <Modal
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
                className="ml-5"
                subPrimary
              >
                Feedback
              </ButtonFields>

              <ButtonFields
                type="button"
                onClick={handleApproveRequest}
                isLoading={approvalSellerResults.isLoading}
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
                {sellerDetail.data.sellerName}
              </span>
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Seller Email:</h3>
              <span className="modal-seller__detail-text">
                {sellerDetail.data.emailSeller}
              </span>
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Seller Address:</h3>
              <span className="modal-seller__detail-text">
                {sellerDetail.data.address}
              </span>
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Location Detail:</h3>
              <span className="modal-seller__detail-text">
                {sellerDetail.data.province}, {sellerDetail.data.district},
                {sellerDetail.data.commune}
              </span>
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Phone Number:</h3>
              <span className="modal-seller__detail-text">
                {sellerDetail.data.phoneNumber}
              </span>
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Created At:</h3>
              <span className="modal-seller__detail-text">
                {formatDateTime(sellerDetail.data.createdAt)}
              </span>
            </div>
          </div>
        </Modal>
      )}
      {/* MODAL DETAIL */}

      {/* MODAL FEEDBACK */}
      {!!sellerDetail.data && !sellerDetail.isLoading && (
        <Modal
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
                {sellerDetail.data.sellerName}
              </span>
            </div>

            <div className="modal-seller__detail-group">
              <h3 className="modal-seller__detail-title">Seller Email:</h3>
              <span className="modal-seller__detail-text">
                {sellerDetail.data.emailSeller}
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
