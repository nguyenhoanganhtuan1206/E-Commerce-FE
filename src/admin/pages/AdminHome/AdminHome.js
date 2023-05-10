import { Chart, Featured, Navbar, Sidebar, Widget } from "../../components";

import "./AdminHome.scss";

const AdminHome = () => {
  return (
    <div className="row">
      <div className="col-2 pr-0">
        <Sidebar />
      </div>
      <div className="col-10 pl-0">
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

export default AdminHome;
