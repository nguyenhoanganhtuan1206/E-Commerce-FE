import "./DashboardUser.scss";

import {
  faBell,
  faCheckCircle,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const DashboardUser = (props) => {
  return (
    <div className="dashboard-user">
      <div className="dashboard-user__header">
        <div className="row">
          <div className="col-4">
            <div className="dashboard-user__card">
              <div className="dashboard-user__card-icon__group">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="dashboard-user__card-icon one"
                />
              </div>

              <div className="dashboard-user__card-detail">
                <h3>340</h3>
                <span>Total Ad Posted</span>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="dashboard-user__card">
              <div className="dashboard-user__card-icon__group">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="dashboard-user__card-icon two"
                />
              </div>

              <div className="dashboard-user__card-detail">
                <h3>340</h3>
                <span>Total Ad Purchased</span>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="dashboard-user__card">
              <div className="dashboard-user__card-icon__group">
                <FontAwesomeIcon
                  icon={faComment}
                  className="dashboard-user__card-icon three"
                />
              </div>

              <div className="dashboard-user__card-detail">
                <h3>340</h3>
                <span>Total Ad Evaluated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-user__body mt-5">
        <div className="row">
          <div className="col-6">
            <div className="dashboard-user__activity-log">
              <div className="main-content--user">
                <h3 className="main-content--user__header">My Activity Log</h3>

                <div className="dashboard-user__activity-body">
                  <ul className="dashboard-user__activity-list">
                    <li className="dashboard-user__activity-item">
                      <FontAwesomeIcon
                        icon={faBell}
                        className="dashboard-user__activity-icon"
                      />

                      <div className="dashboard-user__activity-detail">
                        <h4>Your Profile Updated!</h4>
                        <span>12 Minutes Ago</span>
                      </div>
                    </li>

                    <li className="dashboard-user__activity-item">
                      <FontAwesomeIcon
                        icon={faBell}
                        className="dashboard-user__activity-icon"
                      />

                      <div className="dashboard-user__activity-detail">
                        <h4>Your Profile Updated!</h4>
                        <span>12 Minutes Ago</span>
                      </div>
                    </li>

                    <li className="dashboard-user__activity-item">
                      <FontAwesomeIcon
                        icon={faBell}
                        className="dashboard-user__activity-icon"
                      />

                      <div className="dashboard-user__activity-detail">
                        <h4>Your Profile Updated!</h4>
                        <span>12 Minutes Ago</span>
                      </div>
                    </li>

                    <li className="dashboard-user__activity-item">
                      <FontAwesomeIcon
                        icon={faBell}
                        className="dashboard-user__activity-icon"
                      />

                      <div className="dashboard-user__activity-detail">
                        <h4>Your Profile Updated!</h4>
                        <span>12 Minutes Ago</span>
                      </div>
                    </li>

                    <li className="dashboard-user__activity-item">
                      <FontAwesomeIcon
                        icon={faBell}
                        className="dashboard-user__activity-icon"
                      />

                      <div className="dashboard-user__activity-detail">
                        <h4>Your Profile Updated!</h4>
                        <span>12 Minutes Ago</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="dashboard-user__recent-ads">
              <div className="main-content--user">
                <h3 className="main-content--user__header">Recent Ads</h3>

                <div className="dashboard-user__activity-body">
                  <ul className="dashboard-user__activity-list">
                    <li className="dashboard-user__activity-item">
                      <img
                        src="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt="Activity"
                        className="dashboard-user__activity-img"
                      />
                      <div className="dashboard-user__activity-detail">
                        <h4>Your Profile Updated!</h4>
                        <span>12 Minutes Ago</span>
                      </div>
                    </li>

                    <li className="dashboard-user__activity-item">
                      <img
                        src="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt="Activity"
                        className="dashboard-user__activity-img"
                      />
                      <div className="dashboard-user__activity-detail">
                        <h4>Your Profile Updated!</h4>
                        <span>12 Minutes Ago</span>
                      </div>
                    </li>

                    <li className="dashboard-user__activity-item">
                      <img
                        src="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt="Activity"
                        className="dashboard-user__activity-img"
                      />
                      <div className="dashboard-user__activity-detail">
                        <h4>Your Profile Updated!</h4>
                        <span>12 Minutes Ago</span>
                      </div>
                    </li>

                    <li className="dashboard-user__activity-item">
                      <img
                        src="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt="Activity"
                        className="dashboard-user__activity-img"
                      />
                      <div className="dashboard-user__activity-detail">
                        <h4>Your Profile Updated!</h4>
                        <span>12 Minutes Ago</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
