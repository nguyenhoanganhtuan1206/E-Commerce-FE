import React, { memo } from "react";

import UserLocationItem from "./UserLocationItem";

import './UserLocationItem.scss';

const UserLocationsList = ({ locations = [] }) => {
  return (
    <>
      {locations.map((location, index) => {
        return (
          <div className="user-location__list-item" key={index}>
            <UserLocationItem
              locationId={location.id}
              address={location.address}
              city={location.city}
              district={location.district}
              commune={location.commune}
              defaultLocation={location.defaultLocation}
            />
          </div>
        );
      })}
    </>
  );
};

export default memo(UserLocationsList);
