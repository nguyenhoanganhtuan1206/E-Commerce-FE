import "../../page/auth/Auth.scss";
import "../../components/auth/Login.scss";

import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

import Auth from "../../page/auth/Auth";
import { ButtonFields, InputFields } from "../../../shared/FormElement";
import { VALIDATOR_REQUIRED } from "../../../shared/util/validators";

const Registration = () => {
  const methods = useForm({ mode: "all" });

  return (
    <FormProvider {...methods}>
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
          fieldName="title"
          validators={[VALIDATOR_REQUIRED("This form must be required")]}
          placeholder="Enter Title"
          type="text"
          label="Add Title"
          htmlFor="title"
        />

        <InputFields
          fieldName="title"
          validators={[VALIDATOR_REQUIRED("This form must be required")]}
          placeholder="Enter Title"
          type="password"
          label="Add Title"
          htmlFor="title"
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

        <ButtonFields primary className="auth-form__btn">
          Registration
        </ButtonFields>

        <span className="outer__link">
          Already have an account?
          <Link to={"/login"}>Login Now</Link>
        </span>
      </Auth>
    </FormProvider>
  );
};

export default Registration;
