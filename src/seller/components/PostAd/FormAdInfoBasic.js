import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import useThunk from "../../../shared/hooks/useThunk";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import { fetchCategory } from "../../../redux/thunks/admin/category/categoryThunk";
import {
  InputFields,
  SelectFields,
  UploadMultipleImages,
} from "../../../shared/FormElement";
import {
  VALIDATOR_MAX,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";
import { fetchBrands } from "../../../redux/thunks/admin/brand/brandThunk";
import { fetchCategoryVariants } from "../../../redux/thunks/admin/variant/variantThunk";

const FormAdInfoBasic = () => {
  const params = useParams();
  const fetchAllState = useSelector((state) => state.fetchAll);

  const multipleImagesState = useSelector((state) => state.multipleImages);

  const [doFetchCategories, isLoadingCategories] = useThunk(fetchCategory);
  const [doFetchBrands, isLoadingBrands] = useThunk(fetchBrands);
  const [doFetchCategoryVariants, isLoadingCategoryVariants] = useThunk(
    fetchCategoryVariants
  );

  const isLoading =
    isLoadingBrands || isLoadingCategories || isLoadingCategoryVariants;

  useEffect(() => {
    doFetchBrands();
    doFetchCategories();
    doFetchCategoryVariants();
  }, [doFetchBrands, doFetchCategories, doFetchCategoryVariants]);

  return (
    <>
      {isLoading && <LoadingSpinner option1 />}

      {!isLoading && (
        <>
          <InputFields
            fieldName="name"
            label="Product Name*"
            placeholder="Enter product's name"
            validators={[
              VALIDATOR_REQUIRED("Product Name can't be empty"),
              VALIDATOR_MINLENGTH(6, "Product Name at least 6 characters"),
              VALIDATOR_MAXLENGTH(50, "Price must be less than 50 characters"),
            ]}
          />

          <div className="row">
            <div className="col-6">
              <SelectFields
                fieldName="variantName"
                label="Category Variant*"
                validators={[
                  VALIDATOR_REQUIRED("Category Variant cannot be empty"),
                ]}
                initialValue=""
              >
                <option value="" disabled>
                  Please choose category variant
                </option>

                {fetchAllState.categoryVariants.data.map((variant) => (
                  <option key={variant.id} value={variant.name}>
                    {variant.name}
                  </option>
                ))}
              </SelectFields>
            </div>

            <div className="col-6">
              <SelectFields
                fieldName="brandName"
                label="Brand*"
                validators={[VALIDATOR_REQUIRED("Brand cannot be empty")]}
                initialValue=""
              >
                <option value="" disabled>
                  Please choose brand
                </option>

                {fetchAllState.brands.data.map((brand) => (
                  <option key={brand.id} value={brand.brandName}>
                    {brand.brandName}
                  </option>
                ))}
              </SelectFields>
            </div>
          </div>

          <UploadMultipleImages
            fieldName="images"
            // initialValue={
            //   !!multipleImagesState.images
            //     ? multipleImagesState.images.imagesProduct
            //     : []
            // }
            currentProductId={params.productId}
            validators={[
              VALIDATOR_REQUIRED("Images product cannot be empty"),
              VALIDATOR_MIN("At least 5 images for product", 1),
              VALIDATOR_MAX("Just 5 images for product", 6),
            ]}
          />

          <InputFields
            fieldName="description"
            validators={[
              VALIDATOR_REQUIRED("Description can't be empty"),
              VALIDATOR_MINLENGTH(
                10,
                "Description must be at least 10 characters"
              ),
            ]}
            placeholder="Enter Description"
            type="textarea"
            label="Description*"
            htmlFor="description"
          />
        </>
      )}
    </>
  );
};

export default FormAdInfoBasic;
