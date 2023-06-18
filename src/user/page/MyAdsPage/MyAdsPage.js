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
      <Breadcrumbs
        currentPage="Home"
        nextPages={[{ title: "MyAds", link: "/my-ads" }]}
      />
      {/* BreadCrumbs */}

      <MainComponentUser>
        <MyAdsUser />
      </MainComponentUser>
    </>
  );
};

export default MyAdsPage;
