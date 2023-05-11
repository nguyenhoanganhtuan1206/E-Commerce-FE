import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import "./SellerSignUp.scss";

import {
  useFetchDetailSellerQuery,
  useRegisterNewSellerMutation,
  useUpdateSellerMutation,
} from "../../../redux/apis/user/seller/seller-register.api";
import {
  ButtonFields,
  InputFields,
  RegionDropdown,
} from "../../../shared/FormElement";
import {
  ModalWarning,
  ModalSuccess,
  LoadingSpinner,
} from "../../../shared/components";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
  VALIDATOR_EMAIL,
  VALIDATOR_CHARACTERS,
} from "../../../shared/util/validators";
import {
  clearMessageSuccessful,
  setMessageRegisterSuccessful,
  toggleShowConfirmEmail,
} from "../../../redux/slices/seller/sellerSlice";

const SellerSignUpDetail = () => {
  const methods = useForm({ mode: "all" });

  const dispatch = useDispatch();
  const sellerState = useSelector((state) => state.seller);

  const fetchSellerDetail = useFetchDetailSellerQuery();
  const [registerNewSeller, registerNewSellerResults] =
    useRegisterNewSellerMutation();
  const [updateSeller, updateSellerResults] = useUpdateSellerMutation();

  useEffect(() => {
    if (!registerNewSellerResults.isError) {
      methods.reset(fetchSellerDetail.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchSellerDetail, registerNewSellerResults]);

  const onSubmit = useCallback(
    async (data) => {
      if (sellerState.data) {
        updateSeller(data)
          .unwrap()
          .then(() =>
            dispatch(
              setMessageRegisterSuccessful(
                "Your request become a seller has been successfully submitted. Please wait for our approval."
              )
            )
          )
          .catch((error) =>
            toast.error(
              error.data.message || "Something went wrong! Please try again"
            )
          )
          .finally(() => dispatch(toggleShowConfirmEmail()));
      } else {
        registerNewSeller(data)
          .unwrap()
          .then(() =>
            dispatch(
              setMessageRegisterSuccessful(
                "Your request become a seller has been successfully submitted. Please wait for our approval."
              )
            )
          )
          .catch((error) =>
            toast.error(
              error.data.message || "Something went wrong! Please try again"
            )
          )
          .finally(() => dispatch(toggleShowConfirmEmail()));
      }
    },
    [dispatch, sellerState, registerNewSeller, updateSeller]
  );

  return (
    <>
      {fetchSellerDetail.isFetching && <LoadingSpinner option2 />}

      <ModalSuccess
        show={sellerState.messageSuccessful}
        message={sellerState.messageSuccessful}
        onCancel={() => dispatch(clearMessageSuccessful())}
        footer={
          <div className="d-flex align-items-center justify-content-between">
            <ButtonFields
              type="button"
              onClick={() => dispatch(clearMessageSuccessful())}
              borderOnly
              className="seller-form__btn"
            >
              Close
            </ButtonFields>
            <ButtonFields
              type="button"
              onClick={() => dispatch(clearMessageSuccessful())}
              primary
              className="seller-form__btn"
            >
              OK
            </ButtonFields>
          </div>
        }
      />

      <FormProvider {...methods}>
        <InputFields
          fieldName="sellerName"
          validators={[
            VALIDATOR_REQUIRED("Seller Name cannot be empty"),
            VALIDATOR_MINLENGTH(
              6,
              "Seller name must be at between 6 to 50 characters"
            ),
            VALIDATOR_MAXLENGTH(
              50,
              "Seller name must be at between 6 to 50 characters"
            ),
            VALIDATOR_CHARACTERS("Seller name must be characters"),
          ]}
          placeholder="Enter Seller Name"
          type="text"
          label="Seller Name (*)"
          htmlFor="sellerName"
        />

        <InputFields
          fieldName="emailSeller"
          validators={[
            VALIDATOR_REQUIRED("Email cannot be empty"),
            VALIDATOR_MINLENGTH(9, "Email is invalid"),
            VALIDATOR_EMAIL("Email is invalid"),
          ]}
          placeholder="Enter Seller Email"
          type="text"
          label="Email (*)"
          htmlFor="email"
        />

        <div className="row mt-5">
          <div className="col-4">
            <InputFields
              fieldName="phoneNumber"
              validators={[
                VALIDATOR_REQUIRED("Phone Number cannot be empty"),
                VALIDATOR_MINLENGTH(9, "Phone Number is invalid"),
                VALIDATOR_MAXLENGTH(11, "Phone Number is invalid"),
              ]}
              placeholder="Enter Phone Number"
              type="text"
              label="Phone Number (*)"
              htmlFor="phoneNumber"
            />
          </div>

          <div className="col-8">
            <InputFields
              fieldName="address"
              validators={[
                VALIDATOR_REQUIRED("Address cannot be empty"),
                VALIDATOR_MINLENGTH(3, "Address is invalid"),
              ]}
              placeholder="Enter Address"
              type="text"
              label="Address (*)"
              htmlFor="address"
            />
          </div>
        </div>

        <div className="mt-5">
          <RegionDropdown control={methods.control} />
        </div>

        {!!sellerState.data &&
          sellerState.data.sellerApproval === "PENDING" && (
            <p className="form-seller__profile-text">
              (*) Your previous request has been successfully submitted and is
              being reviewed by the admin.
            </p>
          )}

        <ButtonFields
          type="button"
          onClick={() => dispatch(toggleShowConfirmEmail())}
          disabled={!methods.formState.isValid}
          primary
          className="mt-4"
        >
          Registration
        </ButtonFields>

        <ModalWarning
          show={sellerState.isShowConfirmEmail}
          onSubmit={methods.handleSubmit(onSubmit)}
          onCancel={() => dispatch(toggleShowConfirmEmail())}
          headerWarning="Verify Email Address"
          footer={
            <div className="d-flex align-items-center justify-content-between">
              <ButtonFields
                type="button"
                onClick={() => dispatch(toggleShowConfirmEmail())}
                borderOnly
                className="seller-form__btn"
              >
                Close
              </ButtonFields>
              <ButtonFields
                type="submit"
                isLoading={
                  sellerState.data
                    ? updateSellerResults.isLoading
                    : registerNewSellerResults.isLoading
                }
                primary
                className="seller-form__btn"
              >
                Confirm Registration
              </ButtonFields>
            </div>
          }
        >
          This email is to confirm your sale on our system. Please confirm that
          your email address is correct
        </ModalWarning>
      </FormProvider>
    </>
  );
};

export default SellerSignUpDetail;
