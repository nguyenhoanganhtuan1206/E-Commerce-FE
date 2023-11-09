import SidebarSeller from "../Sidebar/SidebarSeller";

const MainComponentSeller = (props) => {
  return (
    <div className="row">
      <div className="col-2 pr-0">
        <SidebarSeller />
      </div>

      <div className="col-10 pl-0">{props.children}</div>
    </div>
  );
};

export default MainComponentSeller;
