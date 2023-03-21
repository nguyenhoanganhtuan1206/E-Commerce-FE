import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import "./SellerSignUp.scss";

import { ButtonFields, InputFields } from "../../../shared/FormElement";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

const SellerSignUpConfirm = () => {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="seller__sign-up">
      {!methods.formState.isSubmitted && (
        <FormProvider {...methods}>
          <form
            className="seller-form"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <InputFields
              fieldName="sellerEmail"
              validators={[
                VALIDATOR_REQUIRED("Email cannot be empty"),
                VALIDATOR_EMAIL("Email is invalid"),
                VALIDATOR_MINLENGTH(9, "Email must be at least 9 characters"),
              ]}
              placeholder="Enter Email"
              type="email"
              label="Email (*)"
              htmlFor="email"
            />

            <p className="seller-form__text">
              Before proceeding to the next step, you will ned to confirm your
              email address to sell on our platform.
            </p>

            <ButtonFields primary>Confirm Registration</ButtonFields>
          </form>
        </FormProvider>
      )}

      {methods.formState.isSubmitted && (
        <div className="seller-notification">
          <h3 className="seller-notification__title">
            Your request has been sent successfully!
          </h3>
          <p className="seller-notification__text">
            Please check your email and confirm it to proceed to the next step.
          </p>

          <div className="mt-5 d-flex justify-content-center">
            {!methods.getValues("sellerName") && (
              <ButtonFields
                href={`mailto:${methods.getValues("sellerEmail")}`}
                primary
              >
                Click here to open your email
              </ButtonFields>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SellerSignUpConfirm);
