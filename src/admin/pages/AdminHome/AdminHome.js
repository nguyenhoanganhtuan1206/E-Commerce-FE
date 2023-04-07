import { memo } from "react";
import { Navbar, Sidebar } from "../../components";

import "./AdminHome.scss";

const AdminHome = () => {
  return (
    <div className="admin-home">
      <Sidebar />
      <div className="admin-home__container">
        <Navbar />
        home container
      </div>
    </div>
  );
};

export default memo(AdminHome);
