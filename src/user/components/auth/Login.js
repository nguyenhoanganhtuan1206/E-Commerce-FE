import "../../page/auth/Auth.scss";
import "../../components/auth/Login.scss";

import { Link } from "react-router-dom";

import { FormProvider, useForm } from "react-hook-form";

import Auth from "../../page/auth/Auth";
import { ButtonFields, InputFields } from "../../../shared/FormElement";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";
import useApiClient from "../../../shared/hooks/useAxios";
import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/auth-context";

const Login = () => {
  const methods = useForm({ mode: "onSubmit" });

  const authContext = useContext(AuthContext);

  const { error, isLoading, apiClient } = useApiClient();

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.post("/auth/login", data);
      
      authContext.login(response.data);
      toast.success("Login Successfully!");
    } catch (err) {
      toast.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Auth heading="Login Form">
          <div className="auth-form__social">
            <ButtonFields className="auth-form__social-google">
              <i className="fa-brands fa-google icon"></i>
              <span>Login with Google</span>
            </ButtonFields>

            <ButtonFields className="auth-form__social-facebook">
              <i className="fa-brands fa-facebook icon"></i>
              <span>Login with Facebook</span>
            </ButtonFields>
          </div>

          <div className="alt-option">
            <span>Or</span>
          </div>

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
            isLoading={isLoading}
            primary
            className="auth-form__btn"
          >
            Login Now
          </ButtonFields>

          <span className="outer__link">
            Don't have already account?
            <Link to={"/register"}>Register Now</Link>
          </span>
        </Auth>
      </form>
    </FormProvider>
  );
};

export default Login;
