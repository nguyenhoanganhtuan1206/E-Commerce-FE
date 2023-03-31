import "../MainStylesUser.scss";

import {
  InputFields,
  SelectFields,
  UploadMultipleImages,
} from "../../../shared/FormElement";
import {
  VALIDATOR_MAX,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_NUMBER,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";
import { memo } from "react";

const FormAdDetails = () => {
  return (
    <>
      <div className="row u-margin-top-medium">
        <div className="col-4">
          <InputFields
            fieldName="quantity"
            type="number"
            label="Quantity*"
            htmlFor="quantity"
            fullWidth
            placeholder="Enter quantity's product"
            validators={[
              VALIDATOR_REQUIRED("Quantity cannot be empty"),
              VALIDATOR_NUMBER("Quantity must be a number"),
              VALIDATOR_MAX(10000, "Quantity must be less than 10000"),
              VALIDATOR_MIN(1, "Quantity must be at least 1"),
            ]}
          />
        </div>

        <div className="col-4">
          <InputFields
            fieldName="price"
            type="number"
            label="Price*"
            htmlFor="price"
            placeholder="Enter product's price"
            validators={[
              VALIDATOR_REQUIRED("Product price cannot be empty"),
              VALIDATOR_NUMBER("Price must be a number"),
              VALIDATOR_MAX(1000000, "Price must be less than $10.00.000"),
              VALIDATOR_MIN(5, "Price must be at least $5"),
            ]}
          />
        </div>

        <div className="col-4">
          <SelectFields
            fieldName="condition"
            initialValue="New"
            label="Condition*"
            validators={[
              VALIDATOR_REQUIRED("Condition product cannot be empty"),
            ]}
          >
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="refurbished">Refurbished</option>
          </SelectFields>
        </div>
      </div>

      <UploadMultipleImages
        fieldName="images"
        validators={[
          VALIDATOR_MIN("At least 5 images for product", 1),
          VALIDATOR_MAX("Just 5 images for product", 6),
        ]}
      />

      <InputFields
        fieldName="description"
        validators={[
          VALIDATOR_REQUIRED("Description can't be empty"),
          VALIDATOR_MINLENGTH(10, "Description must be at least 10 characters"),
        ]}
        placeholder="Enter Description"
        type="textarea"
        label="Description*"
        htmlFor="description"
      />
    </>
  );
};

export default memo(FormAdDetails);
