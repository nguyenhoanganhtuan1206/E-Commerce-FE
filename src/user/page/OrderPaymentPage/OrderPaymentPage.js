import { Breadcrumbs } from "../../../shared/components";
import { Header } from "../../../shared/Layouts";
import { OrderPayment } from "../../components";

const MyCartPage = (props) => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* BreadCrumbs */}
      <Breadcrumbs
        currentPage="Order Payment"
        nextPages={[
          { title: "Home", link: "/" },
          { title: "My Cart", link: "/my-cart" },
        ]}
      />
      {/* BreadCrumbs */}
      <OrderPayment />
    </>
  );
};

export default MyCartPage;
