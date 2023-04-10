import { memo } from "react";

import "./ManagementSellerPage.scss";
import { ManagementSeller, MainComponentAdmin } from "../../components";

const ManagementSellerPage = () => {
  return (
    <MainComponentAdmin>
      <ManagementSeller />
    </MainComponentAdmin>
  );
};

export default memo(ManagementSellerPage);
