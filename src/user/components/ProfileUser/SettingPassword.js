import { memo, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUpdateUserPasswordMutation } from "../../../redux/apis/user/profile/user-profile.api";
import { ButtonFields, InputFields } from "../../../shared/FormElement";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

import "./ProfileUser.scss";

const schema = yup.object({
  newPassword: yup.string(),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword")],
      "Confirm Password must match with New Password"
    ),
});

const SettingsPassword = () => {
  const methods = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const [updatePassword, updatePasswordResults] =
    useUpdateUserPasswordMutation();

  const onSubmit = useCallback(
    async (data) => {
      updatePassword(data)
        .unwrap()
        .then(() => {
          methods.reset();
          toast.success("Updated Your Password Successfully!", {
            autoClose: 2000,
          });
        })
        .catch((error) => toast.error(error.data.message));
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
            fieldName="currentPassword"
            type="password"
            label="Current Password*"
            htmlFor="currentPassword"
            placeholder="Enter current password"
            validators={[
              VALIDATOR_REQUIRED("Current Password cannot be empty"),
              VALIDATOR_MINLENGTH(6, "Current Password at least 6 characters"),
              VALIDATOR_MAXLENGTH(
                30,
                "Current Password must be less than 30 characters"
              ),
            ]}
          />
          <InputFields
            fieldName="newPassword"
            type="password"
            label="New Password*"
            htmlFor="newPassword"
            placeholder="Enter new password"
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
            isLoading={updatePasswordResults.isLoading}
            primary
            className="profile-user__btn"
            disabled={!methods.formState.isValid || !methods.formState.isDirty}
          >
            Upload Password
          </ButtonFields>
        </form>
      </FormProvider>
    </>
  );
};

export default memo(SettingsPassword);
