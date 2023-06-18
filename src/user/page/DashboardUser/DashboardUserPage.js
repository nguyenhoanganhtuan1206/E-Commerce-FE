import { Breadcrumbs } from "../../../shared/components";
import { Header } from "../../../shared/Layouts";
import { MainComponentUser } from "../../components";

import { DashboardUser } from "../../components";

const DashboardUserPage = () => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* BreadCrumbs */}
      <Breadcrumbs
        currentPage="Dashboard"
        nextPages={[{ title: "Home", link: "/" }]}
      />
      {/* BreadCrumbs */}

      <MainComponentUser>
        <DashboardUser />
      </MainComponentUser>
    </>
  );
};

export default DashboardUserPage;
