import { memo } from "react";
import { Chart, Featured, Navbar, Sidebar, Widget } from "../../components";

import "../AdminLayoutStyles.scss";
import "./AdminHome.scss";

const AdminHome = () => {
  return (
    <div className="admin-layout admin-home">
      <Sidebar />
      <div className="admin-layout__container">
        <Navbar />

        <div className="admin-home__widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="income" />
          <Widget type="balance" />
        </div>

        <div className="admin-home__charts">
          <Featured />
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default memo(AdminHome);
