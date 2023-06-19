import { Breadcrumbs } from "../../../shared/components";
import { Header } from "../../../shared/Layouts";
import { MainComponentUser } from "../../components";
import MyCartList from "../../components/MyCart/MyCartList";

const MyCartPage = () => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* BreadCrumbs */}
      <Breadcrumbs
        currentPage="Home"
        nextPages={[{ title: "My Cart", link: "/my-cart" }]}
      />
      {/* BreadCrumbs */}

      <MainComponentUser>
        <div className="main-content--user">
          <h3 className="main-content--user__header">My Cart</h3>

          <div className="main-content--user__body">
            <MyCartList />
          </div>
        </div>
      </MainComponentUser>
    </>
  );
};

export default MyCartPage;
