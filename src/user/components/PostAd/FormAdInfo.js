import { memo, useCallback, useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { useBrandApis } from "../../../apis/brand/brand.api";

import { useCategoryApis } from "../../../apis/category/category.api";
import { useVariantApis } from "../../../apis/variant/variant.api";
import { LoadingSpinner } from "../../../shared/components";
import { InputFields, SelectFields } from "../../../shared/FormElement";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

const FormAdInfo = () => {
  const { getCategories } = useCategoryApis();
  const { getVariantsByCategoryName } = useVariantApis();
  const { getBrandsByCategoryName } = useBrandApis();
  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [variants, setVariants] = useState([]);
  const [brands, setBrands] = useState([]);

  const categoryNameValue = useWatch({ name: "categories" });

  useEffect(() => {
    const fetchVariants = async () => {
      setIsLoading(true);
      try {
        const responseVariant = await getVariantsByCategoryName(
          categoryNameValue
        );
        const responseBrand = await getBrandsByCategoryName(categoryNameValue);
        setVariants(responseVariant);
        setBrands(responseBrand);
      } catch (err) {
        toast.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVariants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryNameValue]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (err) {
        toast.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner option2 />}

      {!isLoading && categories.length > 0 && (
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
                initialValue={categories[0].categoryName}
                label="Categories*"
                validators={[VALIDATOR_REQUIRED("Category cannot be empty")]}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </SelectFields>
            </div>

            {!isLoading && variants.length > 0 && (
              <div className="col-4">
                <SelectFields
                  fieldName="variant"
                  initialValue="Mobiles"
                  label="Categories*"
                  validators={[VALIDATOR_REQUIRED("Category cannot be empty")]}
                >
                  {variants.map((variant) => (
                    <option key={variant.id} value={variant.variantName}>
                      {variant.variantName}
                    </option>
                  ))}
                </SelectFields>
              </div>
            )}

            {!isLoading && brands.length > 0 && (
              <div className="col-4">
                <SelectFields
                  fieldName="brand"
                  initialValue="Mobiles"
                  label="Categories*"
                  validators={[VALIDATOR_REQUIRED("Category cannot be empty")]}
                >
                  {brands.map((brand) => (
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
