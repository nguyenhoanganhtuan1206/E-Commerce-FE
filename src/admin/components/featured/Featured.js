
import "./Featured.scss";
import {
  KeyboardArrowDown,
  KeyboardArrowUpOutlined,
  MoreVertOutlined,
} from "@mui/icons-material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
  return (
    <div className="admin-featured">
      <div className="admin-featured__top">
        <h3 className="admin-featured__title">Total Revenue</h3>
        <MoreVertOutlined className="admin-featured__icon" />
      </div>
      <div className="admin-featured__bottom">
        <div className="admin-featured__chart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={3} />
        </div>

        <p className="admin-featured__title">Total sales make today</p>
        <p className="admin-featured__amount">$420</p>

        <div className="admin-featured__summary">
          <div className="admin-featured__summary-item">
            <div className="admin-featured__summary-title">Target</div>
            <div className="admin-featured__summary-result negative">
              <KeyboardArrowDown className="admin-featured__icon" />
              <div className="admin-featured__summary-result__amount">
                $12.4k
              </div>
            </div>
          </div>
          <div className="item">
            <div className="admin-featured__summary-title">Last Week</div>
            <div className="admin-featured__summary-result negative">
              <KeyboardArrowUpOutlined className="admin-featured__icon" />
              <div className="admin-featured__summary-result__amount">
                $12.4k
              </div>
            </div>
          </div>
          <div className="item">
            <div className="admin-featured__summary-title">Last Month</div>
            <div className="admin-featured__summary-result negative">
              <KeyboardArrowUpOutlined className="admin-featured__icon" />
              <div className="admin-featured__summary-result__amount">
                $12.4k
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
