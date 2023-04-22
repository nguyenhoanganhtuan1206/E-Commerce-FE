import { memo } from "react";
import UserLocationEditor from "./UserLocationEditor";
import UserLocationsList from "./UserLocationsList";

const UserLocation = () => {
  return (
    <>
      <UserLocationEditor />

      <UserLocationsList />
    </>
  );
};

export default memo(UserLocation);
