import { Breadcrumbs } from "../../../shared/components";
import { Header } from "../../../shared/Layouts";
import { MainComponentUser, MyAdsUser } from "../../components";

const MyAdsPage = (props) => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* BreadCrumbs */}
      <Breadcrumbs title="Home" nextPages={["My Ads"]} />
      {/* BreadCrumbs */}

      <MainComponentUser>
        <div className="main-content--user">
          <h3 className="main-content--user__header">My Ads</h3>

          <div className="main-content--user__body">
            <MyAdsUser />
          </div>
        </div>
      </MainComponentUser>
    </>
  );
};

export default MyAdsPage;
