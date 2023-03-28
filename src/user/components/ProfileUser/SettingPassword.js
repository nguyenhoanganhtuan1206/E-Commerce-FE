import { memo, useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useProfileApis } from "../../../apis/user/profile/profile.api";
import { LoadingSpinner } from "../../../shared/components";
import { ButtonFields, InputFields } from "../../../shared/FormElement";
import {
  VALIDATOR_MATCHING,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

import "./ProfileUser.scss";

const SettingsPassword = () => {
  const methods = useForm({ mode: "onChange" });

  const newPasswordValue = methods.watch("newPassword");
  const confirmPasswordValue = methods.watch("confirmPassword");

  const { updateUserPassword } = useProfileApis();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        await updateUserPassword(data);

        toast.success("Update Password Successfully!");
        methods.reset();
      } catch (err) {
        toast.error(err, {
          autoClose: 2000,
        });
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateUserPassword]
  );

  return (
    <>
      {isLoading && <LoadingSpinner option2 />}

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
