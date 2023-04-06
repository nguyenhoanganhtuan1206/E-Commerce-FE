import { memo } from "react";
import UserLocationEditor from "./UserLocationEditor";
import UserLocationsList from "./UserLocationsList";

const UserLocation = ({ locations }) => {
  return (
    <>
      <UserLocationsList locations={locations} />

      <UserLocationEditor />
    </>
  );
};

export default memo(UserLocation);
