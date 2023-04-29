import { MainComponentUser, SellerSignUpDetail } from "../../components";

import "../MainContent.scss";
import "./PostAd.scss";

import { Header } from "../../../shared/Layouts";
import { FormPostAd } from "../../components/PostAd";
import { Breadcrumbs } from "../../../shared/components";
import { memo, useContext } from "react";
import { AuthContext } from "../../../context/auth-context";

const PostAd = () => {
  const authContext = useContext(AuthContext);

  const sellingEnabled = authContext.roles.includes("ROLE_SELLER");

  return (
    <>
      <Header />

      <Breadcrumbs title="Post An" nextPages={["Home"]} />
      <MainComponentUser>
        <div className="main-content--user">
          <h3 className="main-content--user__header">
            {sellingEnabled ? "Post An Ad" : "Register As Seller"}
          </h3>

          <div className="main-content--user__body">
            {sellingEnabled && <FormPostAd />}

            {!sellingEnabled && <SellerSignUpDetail />}
          </div>
        </div>
      </MainComponentUser>
    </>
  );
};

export default memo(PostAd);
