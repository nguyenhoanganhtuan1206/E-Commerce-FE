import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HeaderPostAd from "./HeaderPostAd";
import "./FormPostAd.scss";
import "../MainStylesUser.scss";

import { FormProvider, useForm } from "react-hook-form";

import { ButtonFields } from "../../../shared/FormElement";
import FormAdInfo from "./FormAdInfo";
import FormAdDetails from "./FormAdDetails";
import FormUserInfo from "./FormUserInfo";
import {
  createError,
  createStart,
  createSuccess,
} from "../../../redux/actions/adSlice";

const FormPostAd = () => {
  const methods = useForm({ mode: "all" });

  const [currentStep, setCurrentStep] = useState(1);

  // useSelector using get value from initialState and reducer in store
  const pending = useSelector((state) => state.ad.pending);
  const error = useSelector((state) => state.ad.error);
  const dispatch = useDispatch();

  const onClickNextStep = useCallback(() => {
    if (currentStep < 3 || methods.formState.formIsValid) {
      setCurrentStep(currentStep + 1);
      localStorage.setItem("currentStep", currentStep + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const onClickPrevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      localStorage.setItem("currentStep", currentStep - 1);
    }
  }, [currentStep]);

  const onSubmit = (e) => {
    console.log(e);
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <FormAdInfo />;

      case 2:
        return <FormAdDetails />;

      case 3:
        return <FormUserInfo />;

      default:
        return <FormAdInfo />;
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="post-ad__form" onSubmit={methods.handleSubmit(onSubmit)}>
        <HeaderPostAd currentSteps={currentStep} />

        {renderForm()}

        <footer className="post-ad__footer">
          {currentStep > 1 && (
            <ButtonFields
              type="button"
              className="post-ad__btn prev"
              onClick={onClickPrevStep}
            >
              Prev Steps
            </ButtonFields>
          )}

          {currentStep < 3 && (
            <ButtonFields
              type="button"
              className="post-ad__btn next"
              onClick={onClickNextStep}
              disabled={!methods.formState.isValid}
            >
              Next Steps
            </ButtonFields>
          )}

          {currentStep === 3 && (
            <ButtonFields
              type="submit"
              className="post-ad__btn next"
              disabled={!methods.formState.isValid}
            >
              Submit Ad
            </ButtonFields>
          )}
        </footer>
      </form>
    </FormProvider>
  );
};

export default memo(FormPostAd);
