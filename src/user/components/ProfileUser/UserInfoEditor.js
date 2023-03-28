import { memo, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import "./ProfileUser.scss";

import { toast } from "react-toastify";

import {
  ButtonFields,
  InputFields,
  UploadImage,
} from "../../../shared/FormElement";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_NUMBER,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";
import { LoadingSpinner } from "../../../shared/components";
import { useProfileApis } from "../../../apis/user/profile/profile.api";

const UserInfoEditor = () => {
  const methods = useForm({
    mode: "onChange",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { fetchUserProfile, updateUserProfile } = useProfileApis();

  useEffect(() => {
    console.log("loading upon", isLoading);
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const fetchProfile = await fetchUserProfile();
        console.log(fetchProfile);

        methods.reset(fetchProfile);
      } catch (err) {
        toast.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        await updateUserProfile(data);

        toast.success("Update Profile Successfully", {
          autoClose: 2000,
        });
      } catch (err) {
        toast.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [updateUserProfile]
  );

  return (
    <>
      {isLoading && <LoadingSpinner option2 />}

      <FormProvider {...methods}>
        <form
          className="profile-user__form"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <UploadImage fieldName="avatar" />

          <div className="profile-user__user-info mt-5">
            <div className="row">
              <div className="col-6">
                <InputFields
                  fieldName="username"
                  type="text"
                  label="Username *"
                  htmlFor="username"
                  placeholder="Enter Username"
                  validators={[
                    VALIDATOR_REQUIRED("Username cannot be empty"),
                    VALIDATOR_MINLENGTH(6, "Username at least 6 characters"),
                    VALIDATOR_MAXLENGTH(
                      50,
                      "Username must be less than 50 characters"
                    ),
                  ]}
                />
              </div>

              <div className="col-6">
                <InputFields
                  fieldName="email"
                  type="email"
                  label="Email *"
                  htmlFor="email"
                  placeholder="Enter Email"
                  validators={[
                    VALIDATOR_REQUIRED("Email cannot be empty"),
                    VALIDATOR_EMAIL("Email is invalid"),
                    VALIDATOR_MINLENGTH(
                      9,
                      "Email must be at least 9 characters"
                    ),
                  ]}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-6">
                <InputFields
                  fieldName="phoneNumber"
                  type="text"
                  label="Phone Number *"
                  htmlFor="phoneNumber"
                  placeholder="Enter Phone Number"
                  validators={[
                    VALIDATOR_REQUIRED("Phone Number cannot be empty"),
                    VALIDATOR_NUMBER("Phone Number is invalid"),
                    VALIDATOR_MINLENGTH(9, "Address is invalid"),
                    VALIDATOR_MAXLENGTH(11, "Address is invalid"),
                  ]}
                />
              </div>

              <div className="col-6">
                <InputFields
                  fieldName="address"
                  type="text"
                  label="Address *"
                  htmlFor="address"
                  placeholder="Enter Address"
                  validators={[
                    VALIDATOR_REQUIRED("Address cannot be empty"),
                    VALIDATOR_MINLENGTH(3, "Address is invalid"),
                  ]}
                />
              </div>
            </div>
          </div>

          <ButtonFields
            disabled={!methods.formState.isValid || !methods.formState.isDirty}
            primary
            className="profile-user__btn"
          >
            Upload Profile
          </ButtonFields>
        </form>
      </FormProvider>
    </>
  );
};

export default memo(UserInfoEditor);
