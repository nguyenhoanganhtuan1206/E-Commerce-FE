import { Breadcrumbs } from "../../../shared/components";
import { SellerSignUp } from "../../components";

const SellerSignUpDetailPage = () => {
  return (
    <>
      <Breadcrumbs
        currentPage="Register As Seller"
        nextPages={[{ title: "Home", link: "/" }]}
      />
      <SellerSignUp />
    </>
  );
};

export default SellerSignUpDetailPage;
