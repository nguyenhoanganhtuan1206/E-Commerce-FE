import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useResetPasswordMutation } from "../../../redux/apis/user/password/user-password.api";
import { ButtonFields, InputFields } from "../../../shared/FormElement";

const schema = yup.object({
  newPassword: yup
    .string()
    .required("Password cannot be empty")
    .min(6, "Password must be at between 6 to 30 characters")
    .max(30, "Password must be at between 6 to 30 characters"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword")],
      "Confirm Password must match with New Password"
    ),
});

const FormResetPassword = ({ code = null }) => {
  const methods = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  const navigate = useNavigate();

  const [doResetPassword, resetPasswordResults] = useResetPasswordMutation();
  const [error, setError] = useState(null);

  const onSubmit = useCallback(
    async (data) => {
      doResetPassword({ code, newPassword: data.newPassword })
        .unwrap()
        .then(() => {
          toast.success("Changed Password Successfully!");
        })
        .catch((error) => setError(error.data.message));
      navigate("/login");
    },
    [doResetPassword, navigate, code]
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
          />

          <InputFields
            fieldName="confirmPassword"
            type="password"
            label="Confirm Password*"
            htmlFor="confirmPassword"
            placeholder="Enter confirm password"
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

export default FormResetPassword;
