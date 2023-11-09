import { useFetchDetailSellerQuery } from "../../../redux/apis/user/seller/seller-register.api";

import { ACTIVE } from "../../../enums/status.enums";
import { ErrorPage } from "../../../shared/pages";
import { SellerSignUpDetail } from "../../../user/components";

const MainPageSeller = (props) => {
  const fetchSellerDetail = useFetchDetailSellerQuery();

  if (fetchSellerDetail.isError) {
    return (
      <ErrorPage messageError="Something went wrong while processing to register as seller! Please try again." />
    );
  }

  if (fetchSellerDetail.data) {
    if (fetchSellerDetail.data.sellerApproval === ACTIVE) {
      return <>{props.children}</>;
    }
  } else {
    return <SellerSignUpDetail />;
  }
};

export default MainPageSeller;
