import { memo } from "react";
import "../MainContent.scss";

import { MainComponentUser, SellerSignUpDetail } from "../../components";
import { Header } from "../../../shared/Layouts";
import { Breadcrumbs } from "../../../shared/components";

const SellerSignUpDetailPage = () => {
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
          <h3 className="main-content--user__header">
            Seller Profile Settings
          </h3>

          <div className="main-content--user__body">
            <SellerSignUpDetail />
          </div>
        </div>
      </MainComponentUser>
    </>
  );
};

export default memo(SellerSignUpDetailPage);
