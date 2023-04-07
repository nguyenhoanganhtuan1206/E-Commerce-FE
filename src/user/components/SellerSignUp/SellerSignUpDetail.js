import { memo, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import "./SellerSignUp.scss";

import { useRegisterSellApis } from "../../../apis/seller/register-sell.api";
import {
  ButtonFields,
  InputFields,
  RegionDropdown,
  CardPaymentMethod,
} from "../../../shared/FormElement";
import { ModalWarning, ModalSuccess } from "../../../shared/components";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
  VALIDATOR_EMAIL,
} from "../../../shared/util/validators";

const SellerSignUpDetail = () => {
  const methods = useForm({ mode: "all" });

  const {
    getRegisteredSellerDetailsByUserId,
    registerNewSeller,
    updateSeller,
  } = useRegisterSellApis();

  const [isLoading, setIsLoading] = useState(false);
  const [userRegistered, setUserRegistered] = useState(null);
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);
  const [messageSuccessful, setMessageSuccessful] = useState(null);
  const [checkboxValues, setCheckboxValues] = useState([]);

  const handleTriggerHiddenConfirmEmail = () => {
    setShowConfirmEmail(!showConfirmEmail);
  };

  const handleHiddenMessageSuccess = () => {
    setMessageSuccessful(null);
  };

  const handleCheckboxChange = (name, checked) => {
    if (checked) {
      setCheckboxValues([...checkboxValues, name]);
    } else {
      setCheckboxValues(checkboxValues.filter((value) => value !== name));
    }
  };

  const onSubmit = useCallback(
    async (data) => {
      if (checkboxValues.length === 0) {
        toast.error("You must select a payment method.", { autoClose: 2000 });

        return;
      }

      setIsLoading(true);
      try {
        if (userRegistered) {
          await updateSeller({ ...data, namePaymentMethods: checkboxValues });
        } else {
          await registerNewSeller({
            ...data,
            namePaymentMethods: checkboxValues,
          });
        }

        setMessageSuccessful(
          "Your request become a seller has been successfully submitted. Please wait for our approval"
        );
      } catch (err) {
        toast.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [checkboxValues, registerNewSeller, updateSeller, userRegistered]
  );

  useEffect(() => {
    const fetchSellerDetail = async () => {
      setIsLoading(true);
      try {
        const response = await getRegisteredSellerDetailsByUserId();

        methods.reset(response);
        setUserRegistered(response);
      } catch (err) {
        toast.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSellerDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalSuccess
        show={!!messageSuccessful}
        message={messageSuccessful}
        footer={
          <div className="d-flex align-items-center justify-content-between">
            <ButtonFields
              type="button"
              onClick={handleHiddenMessageSuccess}
              borderOnly
              className="seller-form__btn"
            >
              Close
            </ButtonFields>
            <ButtonFields
              type="button"
              onClick={handleHiddenMessageSuccess}
              primary
              className="seller-form__btn"
            >
              OK
            </ButtonFields>
          </div>
        }
      />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
            placeholder="Enter Seller Name"
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

          <p className="form-input__label mt-5">Select your payment method *</p>

          <div className="row">
            <div className="col-6">
              <CardPaymentMethod
                fieldName="cod"
                controllerValue="COD"
                imgSrc={"https://www.coolmate.me/images/COD.svg"}
                title="Cash On Delivery"
                subTitle="Payment when received your order"
                onCheckboxChange={handleCheckboxChange}
              />
            </div>
            <div className="col-6">
              <CardPaymentMethod
                fieldName="paypal"
                controllerValue="Paypal"
                imgSrc={"https://cdn-icons-png.flaticon.com/512/174/174861.png"}
                title="Payment With Paypal"
                onCheckboxChange={handleCheckboxChange}
              />
            </div>
          </div>

          {!!userRegistered && !userRegistered.sellerApproval && (
            <p className="form-seller__profile-text">
              (*) Your previous request has been successfully submitted and is
              being reviewed by the admin.
            </p>
          )}

          <ButtonFields
            disabled={!methods.formState.isValid || !checkboxValues.length > 0}
            primary
            className="mt-4"
            isLoading={isLoading}
          >
            Registration
          </ButtonFields>

          <ModalWarning
            show={showConfirmEmail}
            headerWarning="Verify Email Address"
            footer={
              <div className="d-flex align-items-center justify-content-between">
                <ButtonFields
                  type="button"
                  onClick={handleTriggerHiddenConfirmEmail}
                  borderOnly
                  className="seller-form__btn"
                >
                  Close
                </ButtonFields>
                <ButtonFields
                  type="submit"
                  isLoading={isLoading}
                  primary
                  className="seller-form__btn"
                >
                  Confirm Registration
                </ButtonFields>
              </div>
            }
          >
            This email is to confirm your sale on our system. Please confirm
            that your email address is correct
          </ModalWarning>
        </form>
      </FormProvider>
    </>
  );
};

export default memo(SellerSignUpDetail);
