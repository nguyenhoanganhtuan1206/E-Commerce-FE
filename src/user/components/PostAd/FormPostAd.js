import { useCallback, useEffect, useState } from "react";

import "./FormPostAd.scss";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";

import useThunk from "../../../shared/hooks/useThunk";
import { fetchProductById } from "../../../redux/thunks/seller/product/productThunk";
import HeaderPostAd from "./HeaderPostAd";
import FormAdInfoDetails from "./FormAdInfoDetails";
import FormAdInfoAddition from "./FormAdInfoAddition";
import FormAdInfoBasic from "./FormAdInfoBasic";
import { ButtonFields } from "../../../shared/FormElement";
import { useUploadFileFirebase } from "../../../firebase/image-product/firebase-service";
import { useCreateProductMutation } from "../../../redux/apis/seller/product/seller-product.api";
import {
  handleDecreaseStep,
  handleIncreaseStep,
  handleResetStep,
} from "../../../redux/slices/seller/add-product/addProductSlice";
import { useNavigate, useParams } from "react-router-dom";
import { resetInventoryForm } from "../../../redux/slices/seller/inventory/inventorySlice";

const FormPostAd = () => {
  const methods = useForm({
    mode: "all",
  });
  const params = useParams("productId");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const formStepState = useSelector((state) => state.addProduct);

  const addProductState = useSelector((state) => state.addProduct);
  const myAdsState = useSelector((state) => state.myAds);
  const productCategorizationState = useSelector(
    (state) => state.productCategorization
  );
  const productCatalogState = useSelector((state) => state.addProduct);
  const inventoryState = useSelector((state) => state.inventory);
  const [createProduct, createProductResults] = useCreateProductMutation();

  const [doFetchProductById, isLoadingFetchProductById] =
    useThunk(fetchProductById);

  const { handleUploadFile, isError } = useUploadFileFirebase();

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

  const fetchProductData = useCallback(async () => {
    doFetchProductById(params.productId);
    methods.reset(myAdsState.productData);
  }, [doFetchProductById, methods, myAdsState.productData, params.productId]);

  useEffect(() => {
    if (params.productId) {
      fetchProductData();
    }
  }, [fetchProductData, params.productId]);

  const onSubmit = useCallback(
    async (data) => {
      if (data.images.length < 5) {
        toast.error("Please select at least 5 images");

        return;
      }

      if (productCategorizationState.isShowForm) {
        methods.unregister("quantity");
        methods.unregister("price");
      }

      createProduct({
        ...data,
        optionValues: productCatalogState.productOptionValues,
        paymentMethods: addProductState.paymentMethods,
        inventories: productCategorizationState.isShowForm
          ? inventoryState.inventories.map((inventory) => ({
              colorName: inventory.colorName,
              colorValue: inventory.colorValue,
              sizeName: inventory.sizeName,
              sizeValue: inventory.sizeValue,
              quantity: Number(inventory.quantity),
              price: Number(inventory.price),
            }))
          : [],
      })
        .unwrap()
        .then(async (response) => {
          for (const file of data.images) {
            await handleUploadFile(file, response.id, response.sellerId);
          }

          if (isError) {
            return;
          }

          methods.reset();
          toast.success(
            "You created product successfully! Please wait for our approval.",
            { autoClose: 2000 }
          );
          dispatch(handleResetStep());
          dispatch(resetInventoryForm());
          navigate("/my-ads");
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    },
    [
      navigate,
      productCategorizationState.isShowForm,
      createProduct,
      productCatalogState.productOptionValues,
      addProductState.paymentMethods,
      inventoryState.inventories,
      methods,
      isError,
      dispatch,
      handleUploadFile,
    ]
  );

  const renderForm = () => {
    switch (formStepState.currentStepForm) {
      case 1:
        return <FormAdInfoBasic />;

      case 2:
        return <FormAdInfoDetails methods={methods} />;

      case 3:
        return <FormAdInfoAddition />;

      default:
        return <FormAdInfoBasic />;
    }
  };

  return (
    <>
      {/* {isLoadingFetchProductById && <LoadingSpinner option1 />} */}

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
                disabled={
                  addProductState.paymentMethods.length === 0 ||
                  !methods.formState.isValid
                }
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
