import FormCardPaymentMethod from "../SellerSignUp/FormCardPaymentMethod";
import { InputFields } from "../../../shared/FormElement";
import {
  VALIDATOR_MAX,
  VALIDATOR_MIN,
  VALIDATOR_NUMBER,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

const FormAdInfoDetails = () => {
  return (
    <>
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

      <p className="form-input__label mt-5">Select your payment method *</p>
      <FormCardPaymentMethod />
    </>
  );
};

export default FormAdInfoDetails;
