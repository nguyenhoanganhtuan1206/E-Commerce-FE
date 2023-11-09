import FormCardPaymentMethod from "../SellerSignUp/FormCardPaymentMethod";

const FormAdInfoAddition = () => {
  return (
    <>
      <p className="form-input__label mt-5">Select your payment method *</p>
      <FormCardPaymentMethod />
    </>
  );
};

export default FormAdInfoAddition;
