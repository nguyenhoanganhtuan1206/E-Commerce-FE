import { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import "./SellerSignUp.scss";

import { ButtonFields, InputFields } from "../../../shared/FormElement";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";
import { ModalWarning } from "../../../shared/components";

const SellerSignUpConfirm = () => {
  const methods = useForm({ mode: "all" });

  const [showConfirmEmail, setShowConfirmEmail] = useState(false);

  const handleTriggerConfirmEmail = () => {
    setShowConfirmEmail(!showConfirmEmail);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
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
            >
              Close
            </ButtonFields>
            <ButtonFields type="submit" primary>
              Confirm
            </ButtonFields>
          </div>
        }
      />

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
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default memo(SellerSignUpConfirm);
