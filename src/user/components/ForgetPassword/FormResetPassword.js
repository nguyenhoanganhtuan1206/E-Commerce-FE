import { memo, useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useResetPasswordMutation } from "../../../redux/apis/user/password/user-password.api";
import { ButtonFields, InputFields } from "../../../shared/FormElement";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

const schema = yup.object({
  password: yup.string(),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Confirm Password must match with New Password"
    ),
});

const FormResetPassword = ({ token }) => {
  const methods = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const [doResetPassword, resetPasswordResults] = useResetPasswordMutation();
  const [error, setError] = useState(null);

  const onSubmit = useCallback(
    async (data) => {
      doResetPassword({ token, data })
        .unwrap()
        .then(() => {
          toast.success("Change Password Successfully!");
        })
        .catch((error) => setError(error.data.message));
    },
    [doResetPassword, token]
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
            ]}
          />

          <ButtonFields
            isLoading={resetPasswordResults.isLoading}
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
