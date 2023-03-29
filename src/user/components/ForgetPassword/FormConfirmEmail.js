import { memo, useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import "./ForgetPassword.scss";

import { ButtonFields, InputFields } from "../../../shared/FormElement";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";
import { useForgetPasswordApis } from "../../../apis/user/password/password.api";
import { toast } from "react-toastify";

const FormConfirmEmail = () => {
  const methods = useForm();

  const { sendRequestConfirmEmail } = useForgetPasswordApis();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        await sendRequestConfirmEmail(data);

        toast.success(
          "We have sent the link to reset password. Please check your email!",
          { autoClose: 1500 }
        );
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [sendRequestConfirmEmail]
  );

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="form__forget-password"
        >
          <div className="form__forget-password__group">
            <h3 className="form__forget-password__header">Find Your Account</h3>
            <div className="form__forget-password__body">
              <p className="form__forget-password__text">
                Enter the email associated with your account and we'll send you
                to link reset password.
              </p>

              <InputFields
                fieldName="email"
                validators={[
                  VALIDATOR_REQUIRED("Email cannot be empty"),
                  VALIDATOR_MINLENGTH(9, "Email must be at least 9 characters"),
                  VALIDATOR_EMAIL("Email is invalid"),
                ]}
                alertErrorMessage={error}
                placeholder="Enter Your Email"
                type="email"
                htmlFor="email"
              />

              <ButtonFields
                isLoading={isLoading}
                primary
                fullWidth
                className="form__forget-password__btn"
              >
                Confirm
              </ButtonFields>

              <p className="form__forget-password__text text-center mt-5">
                <span>Already have an account?</span>
                <Link className="form__forget-password__link" to="/login">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default memo(FormConfirmEmail);
