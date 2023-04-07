import { memo } from "react";
import UserLocationEditor from "./UserLocationEditor";
import UserLocationsList from "./UserLocationsList";

const UserLocation = ({ locations }) => {
  return (
    <>
      <UserLocationEditor />
      
      <UserLocationsList locations={locations} />
    </>
  );
};

export default memo(UserLocation);
