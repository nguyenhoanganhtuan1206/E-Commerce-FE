import "../MainContent.scss";
import "./PostAd.scss";

import { MainComponentUser, SellerSignUpDetail } from "../../components";
import { Header } from "../../../shared/Layouts";
import { FormPostAd } from "../../components/PostAd";
import { Breadcrumbs } from "../../../shared/components";
import { useFetchDetailSellerQuery } from "../../../redux/apis/user/seller/seller-register.api";

const PostAd = () => {
  const fetchSellerDetail = useFetchDetailSellerQuery();

  let isCheck = false;

  if (fetchSellerDetail.data) {
    if (fetchSellerDetail.data.sellerApproval === "ACTIVE") {
      isCheck = true;
    } else {
      isCheck = false;
    }
  } else {
    isCheck = false;
  }

  return (
    <>
      <Header />

      <Breadcrumbs title="Post An" nextPages={["Home"]} />
      <MainComponentUser>
        <div className="main-content--user">
          <h3 className="main-content--user__header">
            {isCheck ? "Post An Ad" : "Register As Seller"}
          </h3>

          <div className="main-content--user__body">
            {isCheck && <FormPostAd />}

            {!isCheck && <SellerSignUpDetail />}
          </div>
        </div>
      </MainComponentUser>
    </>
  );
};

export default PostAd;
