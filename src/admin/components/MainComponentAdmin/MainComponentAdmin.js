import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

import "./MainComponentAdmin.scss";

const MainComponentAdmin = ({ children }) => {
  return (
    <div className="main-component__admin row">
      <div className="col-2 pr-0">
        <Sidebar />
      </div>
      <div className="col-10 pl-0">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default MainComponentAdmin;
