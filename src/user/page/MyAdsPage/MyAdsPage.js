import { Breadcrumbs } from "../../../shared/components";
import { Header } from "../../../shared/Layouts";
import { MainComponentUser, MyAdsUser } from "../../components";

const MyAdsPage = () => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* BreadCrumbs */}
      <Breadcrumbs title="Home" nextPages={["My Ads"]} />
      {/* BreadCrumbs */}

      <MainComponentUser>
        <MyAdsUser />
      </MainComponentUser>
    </>
  );
};

export default MyAdsPage;
