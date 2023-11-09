import "./SellerSignUp.scss";
import { ButtonFields } from "../../../shared/FormElement";
import { Breadcrumbs } from "../../../shared/components";

const SellerOnBoarding = () => {
  return (
    <div className="seller-onboarding">
      <Breadcrumbs
        currentPage="On-Boarding"
        nextPages={[{ title: "Profile", link: "/profile-user" }]}
      />

      <div className="seller-onboarding__container">
        <h3>Welcome to Grid System</h3>
        <p>
          To register as seller on Grid, you need to provide several basic
          information.
        </p>

        <div className="d-flex align-items-center justify-content-center">
          <ButtonFields to="/seller/sign-up" primary>
            Register
          </ButtonFields>
          <ButtonFields to="/dashboard-user" subPrimary className="ml-3">
            Cancel
          </ButtonFields>
        </div>
      </div>
    </div>
  );
};

export default SellerOnBoarding;
