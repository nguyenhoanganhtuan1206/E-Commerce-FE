import { Fragment } from "react";

import "../../../shared/components/InvoiceOrder/InvoiceOrderUserInfo.scss";

import EmailIcon from "@mui/icons-material/Email";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import HomeIcon from "@mui/icons-material/Home";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

const OrderUserDetails = ({ userInfo = null }) => {
  return (
    <div className="invoice-order__user">
      <h3>Details</h3>

      <div className="invoice-order__user__group">
        <img
          className="invoice-order__user-image"
          alt="Im"
          src="https://media.istockphoto.com/id/1132315403/vi/anh/c%E1%BA%ADn-c%E1%BA%A3nh-ch%C3%A2n-dung-n%E1%BB%AF-doanh-nh%C3%A2n-m%E1%BB%89m-c%C6%B0%E1%BB%9Di.jpg?s=1024x1024&w=is&k=20&c=z7gu3x8JbAgcxCnBVonapL6wapsIqojjSPifPy1Zrrs="
        />

        <p className="invoice-order__text invoice-order__text--limit-width">
          {userInfo.username}
        </p>
      </div>

      <div className="invoice-order__user__group">
        <EmailIcon className="invoice-order__user-icon" />

        <p className="invoice-order__text invoice-order__text--limit-width">
          {userInfo.email}
        </p>
      </div>

      <div className="invoice-order__user__group">
        <ContactPhoneIcon className="invoice-order__user-icon" />

        <p className="invoice-order__text invoice-order__text--limit-width">
          {userInfo.phoneNumber}
        </p>
      </div>

      <div className="invoice-order__user__group">
        <HomeIcon className="invoice-order__user-icon" />

        <p className="invoice-order__text invoice-order__text--limit-line">
          {userInfo.locations.map((location, index) => {
            return (
              <Fragment key={index}>
                {location.defaultLocation && location.address}
              </Fragment>
            );
          })}
        </p>
      </div>

      <div className="invoice-order__user__group">
        <AddLocationIcon className="invoice-order__user-icon" />

        <p className="invoice-order__text invoice-order__text--limit-line">
          {userInfo.locations.map((location, index) => {
            return (
              <Fragment key={index}>
                {location.defaultLocation &&
                  `${location.province}, ${location.commune}, ${location.district}`}
              </Fragment>
            );
          })}
        </p>
      </div>
    </div>
  );
};

export default OrderUserDetails;
