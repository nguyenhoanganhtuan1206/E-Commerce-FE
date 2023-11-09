import { Breadcrumbs } from "../../../shared/components";
import { SellerSignUpDetail } from "../../components";

const SellerSignUpPage = () => {
  return (
    <>
      <Breadcrumbs
        currentPage="Register As Seller"
        nextPages={[{ title: "Home", link: "/" }]}
      />
      <SellerSignUpDetail />
    </>
  );
};

export default SellerSignUpPage;
