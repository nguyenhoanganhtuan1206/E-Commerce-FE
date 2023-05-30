import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./FormPostAd.scss";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";

import useThunk from "../../../shared/hooks/useThunk";
import {
  resetInventoryForm,
  updateInventories,
} from "../../../redux/slices/seller/inventory/inventorySlice";
import { fetchProductById } from "../../../redux/thunks/seller/product/productThunk";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../../redux/apis/seller/product/seller-product.api";
import HeaderPostAd from "./HeaderPostAd";
import FormAdInfoDetails from "./FormAdInfoDetails";
import FormAdInfoAddition from "./FormAdInfoAddition";
import FormAdInfoBasic from "./FormAdInfoBasic";
import { ButtonFields } from "../../../shared/FormElement";
import { LoadingSpinner } from "../../../shared/components";
import { resetProductData } from "../../../redux/slices/seller/myAds/myAdsSlice";
import {
  useUpdateFileFirebase,
  useUploadFileFirebase,
} from "../../../firebase/image-product/firebase-service";
import {
  handleDecreaseStep,
  handleIncreaseStep,
  handleResetStep,
} from "../../../redux/slices/seller/add-product/addProductSlice";
import {
  handleOnChangeColorName,
  handleOnChangeSizeName,
  setStateShowForm,
  setStateShowFormSize,
} from "../../../redux/slices/seller/product-categorization/productCategorizationSlice";

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
  const [updateProduct, updateProductResults] = useUpdateProductMutation();

  const [doFetchProductById, isLoadingFetchProductById] =
    useThunk(fetchProductById);

  const { handleUploadFile, isError } = useUploadFileFirebase();
  const handleUpdateFile = useUpdateFileFirebase();

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

  const fetchData = useCallback(async () => {
    await doFetchProductById(params.productId);
  }, [doFetchProductById, params.productId]);

  const handleFetchedData = useCallback(() => {
    if (!!myAdsState.productData) {
      methods.reset(myAdsState.productData);

      if (myAdsState.productData.inventories.length > 0) {
        dispatch(setStateShowForm(true));
        dispatch(
          handleOnChangeColorName(
            myAdsState.productData.inventories[0].colorName
          )
        );

        if (myAdsState.productData.inventories[0].sizeName) {
          dispatch(setStateShowFormSize(true));
          dispatch(
            handleOnChangeSizeName(
              myAdsState.productData.inventories[0].sizeName
            )
          );
        }
        dispatch(updateInventories(myAdsState.productData.inventories));
      }
    }
  }, [dispatch, methods, myAdsState.productData]);

  useEffect(() => {
    if (params.productId) {
      fetchData();
    } else {
      dispatch(resetProductData());
    }
    dispatch(handleResetStep());
  }, [params.productId, fetchData, dispatch]);

  useEffect(() => {
    handleFetchedData();
  }, [myAdsState.productData, handleFetchedData]);

  const onSubmit = useCallback(
    async (data) => {
      if (!data.images || data.images.length < 1) {
        toast.error("Please select at least 1 images");

        return;
      }

      if (productCategorizationState.isShowForm) {
        methods.unregister("quantity");
        methods.unregister("price");
      }

      const payload = {
        ...data,
        optionValues: productCatalogState.productOptionValues,
        paymentMethods: addProductState.paymentMethods,
        inventories: productCategorizationState.isShowForm
          ? inventoryState.inventories.map((inventory) => {
              const inventoryData = {
                colorName: inventory.colorName,
                colorValue: inventory.colorValue,
                sizeName: inventory.sizeName,
                sizeValue: inventory.sizeValue,
                quantity: Number(inventory.quantity),
                price: Number(inventory.price),
              };

              inventoryData.id = inventory.id;
              return inventoryData;
            })
          : [],
      };

      if (!params.productId) {
        createProduct(payload)
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
      } else {
        updateProduct({ data: payload, productId: params.productId })
          .unwrap()
          .then(async (response) => {
            for (const file of data.images) {
              await handleUploadFile(file, response.id, response.sellerId);
            }

            if (isError) {
              return;
            }

            methods.reset();
            toast.success("Updated product successfully!", { autoClose: 2000 });
            dispatch(handleResetStep());
            dispatch(resetInventoryForm());
            navigate("/my-ads");
          })
          .catch((error) => {
            toast.error(
              error.data.message || "Something went wrong! Please try again"
            );
          });
      }
    },
    [
      productCategorizationState.isShowForm,
      params.productId,
      methods,
      createProduct,
      productCatalogState.productOptionValues,
      addProductState.paymentMethods,
      inventoryState.inventories,
      isError,
      dispatch,
      navigate,
      handleUploadFile,
      updateProduct,
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
      {myAdsState.isLoading && <LoadingSpinner option1 />}

      {!myAdsState.isLoading && (
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
                  disabled={
                    !methods.formState.isValid ||
                    productCategorizationState.isDuplicate ||
                    inventoryState.isDuplicateColorValue ||
                    inventoryState.isDuplicateSizeValue
                  }
                >
                  Next Steps
                </ButtonFields>
              )}

              {formStepState.currentStepForm === 3 && (
                <ButtonFields
                  isLoading={
                    createProductResults.isLoading ||
                    updateProductResults.isLoading
                  }
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
      )}
    </>
  );
};

export default FormPostAd;
