import { memo, useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import "./SellerSignUp.scss";

import { toast } from "react-toastify";
import { ButtonFields, InputFields } from "../../../shared/FormElement";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";
import { ModalWarning } from "../../../shared/components";
import { useRegisterSellApis } from "../../../apis/seller/register-sell.api";

const SellerSignUpConfirm = () => {
  const methods = useForm({ mode: "all" });

  const { sendRequestConfirmEmail } = useRegisterSellApis();

  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);

  const handleTriggerConfirmEmail = () => {
    setShowConfirmEmail(!showConfirmEmail);
  };

  const onSubmit = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        await sendRequestConfirmEmail(data);

        toast.success(
          "Your registration request has been sent! Please check your email for confirmation"
        );
        setShowConfirmEmail(false);
      } catch (err) {
        toast.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [sendRequestConfirmEmail]
  );

  return (
    <>
      <div className="seller__sign-up">
        <FormProvider {...methods}>
          <form
            className="seller-form"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
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

            <p className="seller-form__text">
              (*) Before proceeding to the next step, you will ned to confirm
              your email address to sell on our platform.
            </p>

            <ButtonFields
              type="button"
              primary
              onClick={handleTriggerConfirmEmail}
              disabled={!methods.formState.isValid}
            >
              Confirm Registration
            </ButtonFields>

            <ModalWarning
              show={showConfirmEmail}
              headerWarning="Verify Email Address"
              message="This email is to confirm your sale on our system. Please
                confirm that your email address is correct"
              footer={
                <div className="d-flex align-items-center justify-content-between">
                  <ButtonFields
                    type="button"
                    onClick={handleTriggerConfirmEmail}
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
            />
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default memo(SellerSignUpConfirm);
