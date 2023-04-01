import { memo, useCallback, useState } from "react";
import { toast } from "react-toastify";

import HeaderPostAd from "./HeaderPostAd";
import "./FormPostAd.scss";
import "../MainStylesUser.scss";

import { FormProvider, useForm } from "react-hook-form";

import { useProductApis } from "../../../apis/product/product.api";

import { ButtonFields } from "../../../shared/FormElement";
import FormAdInfo from "./FormAdInfo";
import FormAdDetails from "./FormAdDetails";
import FormUserInfo from "./FormUserInfo";

const FormPostAd = () => {
  const methods = useForm({ mode: "all" });

  const { createProduct } = useProductApis();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        await createProduct(data);
      } catch (err) {
        toast.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [createProduct]
  );

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
              isLoading={isLoading}
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
