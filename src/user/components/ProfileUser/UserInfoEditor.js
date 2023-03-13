import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import "./ProfileUser.scss";

import {
  ButtonFields,
  InputFields,
  UploadImage,
} from "../../../shared/FormElement";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

const UserInfoEditor = (props) => {
  const methods = useForm({ mode: "all" });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
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
                label="Username*"
                htmlFor="username"
                placeholder="Enter email"
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
                label="Email*"
                htmlFor="email"
                placeholder="Enter email"
                validators={[
                  VALIDATOR_REQUIRED("Email cannot be empty"),
                  VALIDATOR_EMAIL("Email is invalid"),
                ]}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-6">
              <InputFields
                fieldName="email"
                type="email"
                label="Email*"
                htmlFor="email"
                placeholder="Enter email"
                validators={[
                  VALIDATOR_REQUIRED("Email cannot be empty"),
                  VALIDATOR_EMAIL("Email is invalid"),
                ]}
              />
            </div>

            <div className="col-6">
              <InputFields
                fieldName="email"
                type="email"
                label="Email*"
                htmlFor="email"
                placeholder="Enter email"
                validators={[
                  VALIDATOR_REQUIRED("Email cannot be empty"),
                  VALIDATOR_EMAIL("Email is invalid"),
                ]}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-6">
              <InputFields
                fieldName="email"
                type="email"
                label="Email*"
                htmlFor="email"
                placeholder="Enter email"
                validators={[
                  VALIDATOR_REQUIRED("Email cannot be empty"),
                  VALIDATOR_EMAIL("Email is invalid"),
                ]}
              />
            </div>

            <div className="col-6">
              <InputFields
                fieldName="email"
                type="email"
                label="Email*"
                htmlFor="email"
                placeholder="Enter email"
                validators={[
                  VALIDATOR_REQUIRED("Email cannot be empty"),
                  VALIDATOR_EMAIL("Email is invalid"),
                ]}
              />
            </div>
          </div>
        </div>

        <ButtonFields primary className="profile-user__btn">
          Upload Profile
        </ButtonFields>
      </form>
    </FormProvider>
  );
};

export default memo(UserInfoEditor);
