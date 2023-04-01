import { memo } from "react";
import "../MainContent.scss";

import { MainComponentUser, SellerSignUpConfirm } from "../../components";
import { Header } from "../../../shared/Layouts";
import { Breadcrumbs } from "../../../shared/components";

const SellerSignUpConfirmPage = () => {
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
          <h3 className="main-content--user__header">Seller Confirm Email</h3>

          <div className="main-content--user__body">
            <SellerSignUpConfirm />
          </div>
        </div>
      </MainComponentUser>
    </>
  );
};

export default memo(SellerSignUpConfirmPage);
