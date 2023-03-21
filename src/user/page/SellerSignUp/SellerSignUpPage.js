import { memo } from "react";
import "../MainContent.scss";

import { MainComponentUser } from "../../components";
import { Header } from "../../../shared/Layouts";
import { Breadcrumbs } from "../../../shared/components";
import SellerSignUpConfirm from "../../components/SellerSignUp/SellerSignUpConfirm";
import SellerSignUpDetail from "../../components/SellerSignUp/SellerSignUpDetail";

const SellerSignUp = () => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* BreadCrumbs */}
      <Breadcrumbs title="Profile Settings" nextPages={["Home"]} />
      {/* BreadCrumbs */}

      <MainComponentUser>
        <div className="main-content--user">
          <h3 className="main-content--user__header">Seller Registration</h3>

          {/* <div className="main-content--user__body">
            <SellerSignUpConfirm />
          </div> */}

          <div className="main-content--user__body">
            <SellerSignUpDetail />
          </div>
        </div>
      </MainComponentUser>
    </>
  );
};

export default memo(SellerSignUp);
