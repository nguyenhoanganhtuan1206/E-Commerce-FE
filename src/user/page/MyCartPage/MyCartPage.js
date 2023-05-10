import { Breadcrumbs } from "../../../shared/components";
import { Header } from "../../../shared/Layouts";
import { MainComponentUser, MyCart } from "../../components";

const MyCartPage = (props) => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* BreadCrumbs */}
      <Breadcrumbs title="Home" nextPages={["My Cart"]} />
      {/* BreadCrumbs */}

      <MainComponentUser>
        <div className="main-content--user">
          <h3 className="main-content--user__header">My Cart</h3>

          <div className="main-content--user__body">
            <MyCart />
          </div>
        </div>
      </MainComponentUser>
    </>
  );
};

export default MyCartPage;
