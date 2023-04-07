import { memo } from "react";
import { Sidebar } from "../../components";

import "./AdminHome.scss";

const AdminHome = () => {
  return (
    <div className="admin-home">
      <Sidebar />
      <div className="admin-home__container">COntainer</div>
    </div>
  );
};

export default memo(AdminHome);
