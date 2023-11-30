import { Breadcrumbs } from "../../../shared/components";
import { Header } from "../../../shared/Layouts";
import { MainComponentUser, MyOrders } from "../../components";

const MyOrderPage = (props) => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* BreadCrumbs */}
      <Breadcrumbs
        currentPage="My Order"
        nextPages={[{ title: "Home", link: "/" }]}
      />
      {/* BreadCrumbs */}
      <MainComponentUser>
        <div className="main-content--user">
          <h3 className="main-content--user__header">My Cart</h3>

          <div className="main-content--user__body">
            <MyOrders />
          </div>
        </div>
      </MainComponentUser>
    </>
  );
};

export default MyOrderPage;
