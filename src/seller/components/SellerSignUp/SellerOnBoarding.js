import { ButtonFields } from "../../../shared/FormElement";

const SellerOnBoarding = () => {
  return (
    <div className="seller-onboarding">
      <h3>Welcome to Grid System</h3>
      <p>
        To register as seller on Grid, you need to provide several basic
        information.
      </p>

      <ButtonFields to="seller/sign-up" primary>Register</ButtonFields>
    </div>
  );
};

export default SellerOnBoarding;
