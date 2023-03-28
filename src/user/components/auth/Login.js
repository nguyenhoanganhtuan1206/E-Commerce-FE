import "../../page/auth/Auth.scss";
import "../../components/auth/Login.scss";

import { Link, useNavigate } from "react-router-dom";

import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { AuthContext } from "../../../context/auth-context";
import { useAuthApis } from "../../../apis/auth/auth.api";

import Auth from "../../page/auth/Auth";
import { ButtonFields, InputFields } from "../../../shared/FormElement";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";
import { useCallback, useContext, useState } from "react";

const Login = () => {
  const methods = useForm({ mode: "onSubmit" });

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const { login } = useAuthApis();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        const response = await login(data);

        authContext.login(response);
        toast.success("Login Successfully!");
        navigate("/");
      } catch (err) {
        console.log(err);
        toast.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [login]
  );

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
