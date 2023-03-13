import "./MainComponentUser.scss";

import SidebarUser from "../SidebarUser/SidebarUser";

const MainComponentUser = (props) => {
  return (
    <div className="dashboard-user__container">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <SidebarUser />
          </div>
          <div className="col-9">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default MainComponentUser;
