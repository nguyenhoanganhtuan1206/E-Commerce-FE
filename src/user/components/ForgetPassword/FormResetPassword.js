import { memo, useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useForgetPasswordApis } from "../../../apis/user/password/password.api";
import { ButtonFields, InputFields } from "../../../shared/FormElement";
import {
  VALIDATOR_MATCHING,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

const FormResetPassword = ({ token }) => {
  const methods = useForm({ mode: "onChange" });

  const newPasswordValue = methods.watch("newPassword");
  const confirmPasswordValue = methods.watch("confirmPassword");

  const { updatePassword } = useForgetPasswordApis();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        await updatePassword(token, data);

        toast.success("Change Password Successfully!");
        methods.reset();
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updatePassword]
  );

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="profile-user__form"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <InputFields
            fieldName="newPassword"
            type="password"
            label="New Password*"
            htmlFor="newPassword"
            placeholder="Enter new password"
            alertErrorMessage={error}
            validators={[
              VALIDATOR_REQUIRED("New Password cannot be empty"),
              VALIDATOR_MINLENGTH(6, "New Password at least 6 characters"),
              VALIDATOR_MAXLENGTH(
                30,
                "New Password must be less than 30 characters"
              ),
              VALIDATOR_MATCHING(
                confirmPasswordValue,
                "New Password must be matching"
              ),
            ]}
          />

          <InputFields
            fieldName="confirmPassword"
            type="password"
            label="Confirm Password*"
            htmlFor="confirmPassword"
            placeholder="Enter confirm password"
            validators={[
              VALIDATOR_REQUIRED("Confirm Password cannot be empty"),
              VALIDATOR_MINLENGTH(6, "Confirm Password at least 6 characters"),
              VALIDATOR_MAXLENGTH(
                30,
                "Confirm Password must be less than 50 characters"
              ),
              VALIDATOR_MATCHING(
                newPasswordValue,
                "Confirm Password must be matching"
              ),
            ]}
          />

          <ButtonFields
            isLoading={isLoading}
            primary
            className="profile-user__btn"
            disabled={!methods.formState.isValid}
          >
            Upload Password
          </ButtonFields>
        </form>
      </FormProvider>
    </>
  );
};

export default memo(FormResetPassword);
