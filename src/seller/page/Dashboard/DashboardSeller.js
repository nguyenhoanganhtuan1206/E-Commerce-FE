import SidebarSeller from "../../components/Sidebar/SidebarSeller";

import { Chart, Featured, Navbar, Widget } from "../../../admin/components";
import { ACTIVE } from "../../../enums/status.enums";
import { useFetchDetailSellerQuery } from "../../../redux/apis/user/seller/seller-register.api";
import { SellerSignUpDetail } from "../../../user/components";
import { ErrorPage } from "../../../shared/pages";

const DashboardSeller = () => {
  const fetchSellerDetail = useFetchDetailSellerQuery();

  if (fetchSellerDetail.data) {
    if (fetchSellerDetail.data.sellerApproval === ACTIVE) {
      return (
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
      );
    } else {
      return <SellerSignUpDetail />;
    }
  } else {
    return (
      <ErrorPage messageError="Something went wrong while processing to register as seller! Please try again." />
    );
  }
};

export default DashboardSeller;
