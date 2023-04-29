import "../../page/auth/Auth.scss";
import "../../components/auth/Login.scss";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

import Auth from "../../page/auth/Auth";
import { useRegisterMutation } from "../../../redux/apis/auth/authApis";
import { ButtonFields, InputFields } from "../../../shared/FormElement";

const schema = yup.object({
  username: yup
    .string()
    .required("Username cannot be empty")
    .min(6, "Username must be at between 6 to 50 characters")
    .max(50, "Username must be at between 6 to 50 characters"),
  email: yup
    .string()
    .required("Email cannot be empty")
    .min(9, "Email must be at least 9 characters")
    .email("Email is invalid"),
  phoneNumber: yup
    .string()
    .required("Phone Number cannot be empty")
    .matches(/\d+/g, "Phone Number is invalid")
    .min(9, "Phone Number is invalid")
    .max(11, "Phone Number is invalid"),
  address: yup
    .string()
    .required("Address cannot be empty")
    .min(3, "Address is invalid"),
  password: yup
    .string()
    .required("Password cannot be empty")
    .min(6, "Password must be at between 6 to 30 characters")
    .max(30, "Password must be at between 6 to 30 characters"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Confirm Password must match with New Password"
    ),
});

const Registration = () => {
  const methods = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  const [register, registerResults] = useRegisterMutation();

  const navigate = useNavigate();

  const onSubmit = useCallback(
    (data) => {
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
            placeholder="Enter Username"
            type="text"
            label="Username (*)"
            htmlFor="username"
          />

          <InputFields
            fieldName="email"
            placeholder="Enter Email"
            type="email"
            label="Email (*)"
            htmlFor="email"
          />

          <InputFields
            fieldName="phoneNumber"
            placeholder="Enter Phone Number"
            type="text"
            label="Phone Number (*)"
            htmlFor="phoneNumber"
          />

          <InputFields
            fieldName="address"
            placeholder="Enter Address"
            type="text"
            label="Address (*)"
            htmlFor="address"
          />

          <InputFields
            fieldName="password"
            placeholder="Enter Password"
            type="password"
            label="Password (*)"
            htmlFor="password"
          />

          <InputFields
            fieldName="confirmPassword"
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
