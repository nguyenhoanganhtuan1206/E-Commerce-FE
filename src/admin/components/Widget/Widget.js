import { memo } from "react";

import "./Widget.scss";
import {
  AccountBalanceWalletOutlined,
  KeyboardArrowUp,
  MonetizationOnOutlined,
  PersonOutline,
  ShoppingCartOutlined,
} from "@mui/icons-material";

const Widget = ({ type }) => {
  const amount = 100;
  const diff = 20;

  let data;
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutline
            className="widget-icon widget-icon__main"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;

    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlined
            className="widget-icon widget-icon__main"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;

    case "income":
      data = {
        title: "INCOME",
        isMoney: false,
        link: "View all income",
        icon: (
          <MonetizationOnOutlined
            className="widget-icon widget-icon__main"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;

    case "balance":
      data = {
        title: "BALANCE",
        isMoney: false,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlined
            className="widget-icon widget-icon__main"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="widget-left">
        <span className="widget-title">{data.title}</span>
        <span className="widget-counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="widget-link">{data.link}</span>
      </div>
      <div className="widget-right">
        <div className="widget-percent widget-percent__positive">
          <KeyboardArrowUp className="widget-icon" />
          {diff}%
        </div>

        {data.icon}
      </div>
    </div>
  );
};

export default memo(Widget);
