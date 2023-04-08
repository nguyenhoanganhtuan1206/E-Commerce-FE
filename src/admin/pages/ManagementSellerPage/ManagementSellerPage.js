import { memo } from "react";

import "./ManagementSellerPage.scss";
import { Sidebar, ManagementSeller } from "../../components";

const ManagementSellerPage = () => {
  return (
    <div className="admin-layout admin-home">
      <Sidebar />
      
      <div className="admin-layout__container">
        <ManagementSeller />
      </div>
    </div>
  );
};

export default memo(ManagementSellerPage);
