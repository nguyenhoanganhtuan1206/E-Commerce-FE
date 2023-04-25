import React, { memo, useContext } from "react";

import UserLocationItem from "./UserLocationItem";
import "./UserLocationItem.scss";

import { useFetchLocationsQuery } from "../../../redux/apis/user/location/user-locations.api";
import CustomSkeleton from "../../../shared/components/Skeleton/Skeleton";
import { AuthContext } from "../../../context/auth-context";

const UserLocationsList = () => {
  const authContext = useContext(AuthContext);
  const { data, isFetching, isError } = useFetchLocationsQuery(
    authContext.userId
  );

  let displayLocations;
  if (isFetching) {
    displayLocations = (
      <CustomSkeleton
        times={3}
        className="mt-4"
        variant="rounded"
        width={"100%"}
        height={40}
      />
    );
  } else if (isError) {
    displayLocations = (
      <p className="text-danger">Something went wrong... Please try again</p>
    );
  } else {
    displayLocations = data.map((location, index) => {
      return (
        <div className="user-location__list-item" key={index}>
          <UserLocationItem
            locationId={location.id}
            address={location.address}
            province={location.province}
            district={location.district}
            commune={location.commune}
            defaultLocation={location.defaultLocation}
          />
        </div>
      );
    });
  }

  return <>{displayLocations}</>;
};

export default memo(UserLocationsList);
