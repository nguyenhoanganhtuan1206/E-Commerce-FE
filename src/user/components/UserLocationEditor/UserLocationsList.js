import React, { memo } from "react";

import UserLocationItem from "./UserLocationItem";

const UserLocationsList = ({ locations = [] }) => {
  return (
    <>
      {locations.map((location, index) => {
        return (
          <React.Fragment key={index}>
            <UserLocationItem
              locationId={location.id}
              address={location.address}
              city={location.city}
              district={location.district}
              commune={location.commune}
              defaultLocation={location.defaultLocation}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default memo(UserLocationsList);
