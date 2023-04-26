import { memo, useEffect } from "react";
import { useWatch } from "react-hook-form";
import { useSelector } from "react-redux";

import useThunk from "../../../shared/hooks/useThunk";
import { fetchCategoryVariantByCategoryName } from "../../../redux/thunks/admin/variant/variantThunk";
import { fetchBrandByCategoryName } from "../../../redux/thunks/admin/brand/brandThunk";
import { fetchCategory } from "../../../redux/thunks/admin/category/categoryThunk";
import { LoadingSpinner } from "../../../shared/components";
import { InputFields, SelectFields } from "../../../shared/FormElement";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

const FormAdInfo = () => {
  const fetchAllState = useSelector((state) => state.fetchAll);
  const categoryNameValue = useWatch({ name: "categories" });

  const [fetchCategories, fetchCategoriesLoading] = useThunk(fetchCategory);
  const [fetchCategoryVariants, fetchCategoryVariantsLoading] = useThunk(
    fetchCategoryVariantByCategoryName
  );
  const [fetchBrands, fetchBrandsLoading] = useThunk(fetchBrandByCategoryName);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchCategoryVariants(categoryNameValue);
    fetchBrands(categoryNameValue);
  }, [categoryNameValue, fetchCategoryVariants, fetchBrands]);

  const isLoadingFetching =
    fetchCategoriesLoading ||
    fetchCategoryVariantsLoading ||
    fetchBrandsLoading;

  return (
    <>
      {isLoadingFetching && <LoadingSpinner option2 />}

      {!isLoadingFetching && (
        <>
          <InputFields
            fieldName="nameProduct"
            label="Product Name*"
            placeholder="Enter product's name"
            validators={[
              VALIDATOR_REQUIRED("Product Name can't be empty"),
              VALIDATOR_MINLENGTH(6, "Product Name at least 6 characters"),
              VALIDATOR_MAXLENGTH(50, "Price must be less than 50 characters"),
            ]}
          />

          <div className="row">
            <div className="col-4">
              <SelectFields
                fieldName="categories"
                initialValue="initialValue"
                label="Categories*"
                validators={[VALIDATOR_REQUIRED("Category cannot be empty")]}
              >
                <option value="initialValue" disabled>
                  Category
                </option>

                {fetchAllState.categories.data.map((category) => (
                  <option key={category.id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </SelectFields>
            </div>

            {!isLoadingFetching &&
              fetchAllState.categoryVariants.data.length > 0 && (
                <div className="col-4">
                  <SelectFields
                    fieldName="variant"
                    initialValue="initialValue"
                    label="Categories Variant*"
                    validators={[
                      VALIDATOR_REQUIRED("Category cannot be empty"),
                    ]}
                  >
                    <option value="initialValue" disabled>
                      Category Variant
                    </option>

                    {fetchAllState.categoryVariants.data.map((variant) => (
                      <option key={variant.id} value={variant.variantName}>
                        {variant.variantName}
                      </option>
                    ))}
                  </SelectFields>
                </div>
              )}

            {!isLoadingFetching && fetchAllState.brands.data.length > 0 && (
              <div className="col-4">
                <SelectFields
                  fieldName="brand"
                  initialValue="initialValue"
                  label="Brand*"
                  validators={[VALIDATOR_REQUIRED("Brand cannot be empty")]}
                >
                  <option value="initialValue" disabled>
                    Brand
                  </option>

                  {fetchAllState.brands.data.map((brand) => (
                    <option key={brand.id} value={brand.brandName}>
                      {brand.brandName}
                    </option>
                  ))}
                </SelectFields>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default memo(FormAdInfo);
