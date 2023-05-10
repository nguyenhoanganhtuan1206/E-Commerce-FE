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
      <Breadcrumbs title="Dashboard" nextPages={["Home"]} />
      {/* BreadCrumbs */}

      <MainComponentUser>
        <DashboardUser />
      </MainComponentUser>
    </>
  );
};

export default DashboardUserPage;
