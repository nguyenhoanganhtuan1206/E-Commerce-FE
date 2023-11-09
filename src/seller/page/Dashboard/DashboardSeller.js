import SidebarSeller from "../../components/Sidebar/SidebarSeller";

import { Chart, Featured, Navbar, Widget } from "../../../admin/components";
import MainPageSeller from "../MainPageSeller/MainPageSeller";

const DashboardSeller = () => {
  return (
    <MainPageSeller>
      <div className="row">
        <div className="col-2 pr-0">
          <SidebarSeller />
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
    </MainPageSeller>
  );
};

export default DashboardSeller;
