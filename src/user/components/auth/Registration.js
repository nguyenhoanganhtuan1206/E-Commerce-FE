import "../../page/auth/Auth.scss";
import "../../components/auth/Login.scss";

import { toast } from "react-toastify";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

import Auth from "../../page/auth/Auth";
import { useRegisterMutation } from "../../../redux/apis/auth/authApis";
import { ButtonFields, InputFields } from "../../../shared/FormElement";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MATCHING,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_NUMBER,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

const Registration = () => {
  const methods = useForm({ mode: "onChange" });
  const [register, registerResults] = useRegisterMutation();

  const navigate = useNavigate();

  const currentPassword = methods.watch("password");
  const currentConfirmPassword = methods.watch("confirmPassword");

  const onSubmit = useCallback(
    async (data) => {
      register(data)
        .unwrap()
        .then(() => {
          navigate("/login");
          toast.success("Registered Successfully!", { autoClose: 2000 });
        })
        .catch((error) => toast.error(error.data.message));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [register]
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Auth heading="Registration Form">
          <div className="auth-form__social">
            <ButtonFields className="auth-form__social-google">
              <i className="fa-brands fa-google icon"></i>
              <span>Register with Google</span>
            </ButtonFields>

            <ButtonFields className="auth-form__social-facebook">
              <i className="fa-brands fa-facebook icon"></i>
              <span>Register with Facebook</span>
            </ButtonFields>
          </div>

          <div className="alt-option">
            <span>Or</span>
          </div>

          <InputFields
            fieldName="username"
            validators={[
              VALIDATOR_REQUIRED("Username cannot be empty"),
              VALIDATOR_MINLENGTH(
                6,
                "Username must be at between 6 to 50 characters"
              ),
              VALIDATOR_MAXLENGTH(
                50,
                "Username must be at between 6 to 50 characters"
              ),
            ]}
            placeholder="Enter Username"
            type="text"
            label="Username (*)"
            htmlFor="username"
          />

          <InputFields
            fieldName="email"
            validators={[
              VALIDATOR_REQUIRED("Email cannot be empty"),
              VALIDATOR_MINLENGTH(9, "Email must be at least 9 characters"),
              VALIDATOR_EMAIL("Email is invalid"),
            ]}
            placeholder="Enter Email"
            type="email"
            label="Email (*)"
            htmlFor="email"
          />

          <InputFields
            fieldName="phoneNumber"
            validators={[
              VALIDATOR_REQUIRED("Phone Number cannot be empty"),
              VALIDATOR_MINLENGTH(9, "Phone Number is invalid"),
              VALIDATOR_MAXLENGTH(11, "Phone Number is invalid"),
              VALIDATOR_NUMBER("Phone Number is invalid"),
            ]}
            placeholder="Enter Phone Number"
            type="text"
            label="Phone Number (*)"
            htmlFor="phoneNumber"
          />

          <InputFields
            fieldName="address"
            validators={[
              VALIDATOR_REQUIRED("Address cannot be empty"),
              VALIDATOR_MINLENGTH(3, "Address is invalid"),
            ]}
            placeholder="Enter Address"
            type="text"
            label="Address (*)"
            htmlFor="address"
          />

          <InputFields
            fieldName="password"
            validators={[
              VALIDATOR_REQUIRED("Password cannot be empty"),
              VALIDATOR_MINLENGTH(
                6,
                "Password must be at between 6 to 30 characters"
              ),
              VALIDATOR_MAXLENGTH(
                30,
                "Password must be at between 6 to 30 characters"
              ),
              VALIDATOR_MATCHING(
                currentConfirmPassword,
                "Password not matching"
              ),
            ]}
            placeholder="Enter Password"
            type="password"
            label="Password (*)"
            htmlFor="password"
          />

          <InputFields
            fieldName="confirmPassword"
            validators={[
              VALIDATOR_REQUIRED("Password cannot be empty"),
              VALIDATOR_MINLENGTH(
                6,
                "Password must be at between 6 to 30 characters"
              ),
              VALIDATOR_MAXLENGTH(
                30,
                "Password must be at between 6 to 30 characters"
              ),
              VALIDATOR_MATCHING(currentPassword, "Password not matching"),
            ]}
            placeholder="Enter Password"
            type="password"
            label="Password (*)"
            htmlFor="password"
          />

          <div className="auth-form__forget">
            <div className="u-d-flex u-aligns-center">
              <input
                id="remember-me"
                type="checkbox"
                className="auth-form__forget-checkbox"
              />
              <label htmlFor="remember-me" className="auth-form__forget-label">
                Remember me
              </label>
            </div>

            <Link className="auth-form__forget-link">Lost your password?</Link>
          </div>

          <ButtonFields
            disabled={!methods.formState.isValid}
            primary
            className="auth-form__btn"
            isLoading={registerResults.isLoading}
          >
            Registration
          </ButtonFields>

          <span className="outer__link">
            Already have an account?
            <Link to={"/login"}>Login Now</Link>
          </span>
        </Auth>
      </form>
    </FormProvider>
  );
};

export default Registration;
