import { memo } from "react";
import { InputFields } from "../../../shared/FormElement";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_NUMBER,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

const FormUserInfo = () => {
  return (
    <>
      <div className="row u-margin-top-medium">
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
            fieldName="phoneNumber"
            type="text"
            label="Phone Number*"
            htmlFor="phoneNumber"
            placeholder="Enter phone number"
            validators={[
              VALIDATOR_REQUIRED("Phone number cannot be empty"),
              VALIDATOR_NUMBER("Phone number is invalid"),
              VALIDATOR_MINLENGTH(9, "Phone number is invalid"),
              VALIDATOR_MAXLENGTH(11, "Phone number is invalid"),
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default memo(FormUserInfo);
