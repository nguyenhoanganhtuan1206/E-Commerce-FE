import { memo } from "react";
import { InputFields, SelectFields } from "../../../shared/FormElement";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

const FormAdInfo = (props) => {
  return (
    <>
      {/* <LoadingSpinner /> */}

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

      <SelectFields
        fieldName="categories"
        initialValue="Mobiles"
        label="Categories*"
        validators={[VALIDATOR_REQUIRED("Category cannot be empty")]}
      >
        <option value="Electronics">Electronics</option>
        <option value="Vehicle">Vehicle</option>
        <option value="Mobiles">Mobiles</option>
        <option value="Furniture">Furniture</option>
        <option value="Fashion">Fashion</option>
      </SelectFields>
    </>
  );
};

export default memo(FormAdInfo);
