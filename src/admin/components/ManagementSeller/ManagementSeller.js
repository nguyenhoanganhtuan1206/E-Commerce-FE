import { memo } from "react";
import { DataTable, Navbar } from "../";

import "./ManagementSeller.scss";

const ManagementSeller = () => {
  return (
    <div className="management-seller">
      <Navbar />

      <DataTable />
    </div>
  );
};

export default memo(ManagementSeller);
