import "./MainComponentAdmin.scss";

import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";
import HeaderAdmin from "../../../shared/Layouts/HeaderAdmin/HeaderAdmin";

const MainComponentAdmin = (props) => {
  return (
    <div className="main-component__admin">
      <div className="row wide">
        <div className="col-3">
          <SidebarAdmin />
        </div>
        <div className="col-9">
          <HeaderAdmin />

          {props.children}
        </div>
      </div>
    </div>
  );
};

export default MainComponentAdmin;
