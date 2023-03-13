import "./SidebarAdmin.scss";

import { Link } from "react-router-dom";

import { faChartLine, faGauge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarAdmin = () => {
  return (
    <nav className="sidebar-admin">
      <div className="sidebar-admin__list">
        <Link className="sidebar-admin__item sidebar-admin__item--active">
          <FontAwesomeIcon icon={faChartLine} className="sidebar-admin__icon" />
          <span>Dashboard</span>
        </Link>

        <Link className="sidebar-admin__item">
          <FontAwesomeIcon icon={faChartLine} className="sidebar-admin__icon" />
          <span>Dashboard</span>
        </Link>

        <Link className="sidebar-admin__item">
          <FontAwesomeIcon icon={faChartLine} className="sidebar-admin__icon" />
          <span>Dashboard</span>
        </Link>

        <Link className="sidebar-admin__item">
          <FontAwesomeIcon icon={faChartLine} className="sidebar-admin__icon" />
          <span>Dashboard</span>
        </Link>
      </div>
    </nav>
  );
};

export default SidebarAdmin;
