import { memo } from "react";
import MyCartList from "./MyCartList";

const MyCart = (props) => {
  return (
    <div>
      <MyCartList />
    </div>
  );
};

export default memo(MyCart);
