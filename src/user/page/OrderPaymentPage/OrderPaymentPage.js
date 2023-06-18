import { Breadcrumbs } from "../../../shared/components";
import { Header } from "../../../shared/Layouts";
import { MainComponentUser } from "../../components";

const MyCartPage = (props) => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* BreadCrumbs */}
      <Breadcrumbs
        title="Order Payment"
        nextPages={[
          { title: "Home", link: "/" },
          { title: "My Cart", link: "/my-cart" },
        ]}
      />
      {/* BreadCrumbs */}

      <MainComponentUser>
        <div className="main-content--user">
          <h3 className="main-content--user__header">Order Payment</h3>

          <div className="main-content--user__body"></div>
        </div>
      </MainComponentUser>
    </>
  );
};

export default MyCartPage;
