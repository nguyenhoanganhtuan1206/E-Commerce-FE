import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ButtonFields, InputFields } from "../../../shared/FormElement";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

import "./ProfileUser.scss";

const SettingsPassword = () => {
  const methods = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
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
              50,
              "Current Password must be less than 50 characters"
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
            VALIDATOR_REQUIRED("Username cannot be empty"),
            VALIDATOR_MINLENGTH(6, "Username at least 6 characters"),
            VALIDATOR_MAXLENGTH(50, "Username must be less than 50 characters"),
          ]}
        />
        
        <InputFields
          fieldName="confirmPassword"
          type="password"
          label="Confirm Password*"
          htmlFor="confirmPassword"
          placeholder="Enter confirm password"
          validators={[
            VALIDATOR_REQUIRED("New Password cannot be empty"),
            VALIDATOR_MINLENGTH(6, "New Password at least 6 characters"),
            VALIDATOR_MAXLENGTH(
              50,
              "New Password must be less than 50 characters"
            ),
          ]}
        />

        <ButtonFields primary className="profile-user__btn">
          Upload Password
        </ButtonFields>
      </form>
    </FormProvider>
  );
};

export default memo(SettingsPassword);
