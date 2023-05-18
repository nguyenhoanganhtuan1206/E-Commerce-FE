import { useCallback } from "react";

import "./FormPostAd.scss";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";

import HeaderPostAd from "./HeaderPostAd";
import FormAdInfoDetails from "./FormAdInfoDetails";
import FormAdInfoAddition from "./FormAdInfoAddition";
import FormAdInfoBasic from "./FormAdInfoBasic";
import { ButtonFields } from "../../../shared/FormElement";
import { useStorageFile } from "../../../firebase/image-product/service-firebase";
import { useCreateProductMutation } from "../../../redux/apis/seller/product/seller-product.api";
import { handleDecreaseStep, handleIncreaseStep } from "../../../redux/slices/seller/add-product/addProductSlice";

const FormPostAd = () => {
  const methods = useForm({ mode: "all" });

  const dispatch = useDispatch();
  const formStepState = useSelector(state => state.addProduct);

  const addProductState = useSelector((state) => state.addProduct);
  const productCategorizationState = useSelector((state) => state.productCategorization);
  const productCatalogState = useSelector((state) => state.addProduct);
  const inventoryState = useSelector((state) => state.inventory);
  const [createProduct, createProductResults] = useCreateProductMutation();

  const { handleStorageFiles, isError } = useStorageFile();


  const onClickNextStep = useCallback(() => {
    if (formStepState.currentStepForm < 3 || methods.formState.formIsValid) {
      dispatch(handleIncreaseStep());
    }
  }, [dispatch, formStepState, methods.formState.formIsValid]);

  const onClickPrevStep = useCallback(() => {
    if (formStepState.currentStepForm > 1) {
      dispatch(handleDecreaseStep());
    }
  }, [dispatch, formStepState]);

  const onSubmit = useCallback(
    async (data) => {
      if (addProductState.paymentMethods.length === 0) {
        toast.error("Shipping options required. Please choose at least one");

        return;
      }

      if (data.images.length < 5) {
        toast.error("Please select at least 5 images");

        return;
      }

      if (isError) {
        return;
      }

      if (productCategorizationState.isShowFormSize) {
        methods.setValue('quantity', 0);
        methods.setValue('price', 0);
      }

      createProduct({
        ...data,
        optionValues: productCatalogState.productOptionValues,
        paymentMethods: addProductState.paymentMethods,
        inventories: inventoryState.inventories.map((inventory) => ({
          colorName: inventory.colorName,
          colorValue: inventory.colorValue,
          sizeName: inventory.sizeName,
          sizeValue: inventory.sizeValue,
          quantity: Number(inventory.quantity),
          price: Number(inventory.price),
        }))
      })
        .unwrap()
        .then(() => {
          data.images.map((file) => handleStorageFiles(file, data.name));

          methods.reset();
          toast.success(
            "You created product successfully! Please wait for our approval.",
            { autoClose: 2000 }
          );
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    },
    [
      addProductState.paymentMethods,
      createProduct,
      handleStorageFiles,
      inventoryState,
      isError,
      methods,
      productCatalogState,
      productCategorizationState
    ]
  );

  const renderForm = () => {
    switch (formStepState.currentStepForm) {
      case 1:
        return <FormAdInfoBasic />;

      case 2:
        return <FormAdInfoDetails />;

      case 3:
        return <FormAdInfoAddition />;

      default:
        return <FormAdInfoBasic />;
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="post-ad__form"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <HeaderPostAd currentSteps={formStepState.currentStepForm} />

          {renderForm()}

          <footer className="post-ad__footer">
            {formStepState.currentStepForm > 1 && (
              <ButtonFields
                type="button"
                className="post-ad__btn prev"
                onClick={onClickPrevStep}
              >
                Prev Steps
              </ButtonFields>
            )}

            {formStepState.currentStepForm < 3 && (
              <ButtonFields
                type="button"
                className="post-ad__btn next"
                onClick={onClickNextStep}
                disabled={!methods.formState.isValid}
              >
                Next Steps
              </ButtonFields>
            )}

            {formStepState.currentStepForm === 3 && (
              <ButtonFields
                isLoading={createProductResults.isLoading}
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
    </>
  );
};

export default FormPostAd;
