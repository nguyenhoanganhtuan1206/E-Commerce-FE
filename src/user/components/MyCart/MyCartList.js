import { memo } from "react";

import "./MyCart.scss";
import MyCartGroupItems from "./MyCartGroupItems";

const MyCartList = (props) => {
  return (
    <>
      <MyCartGroupItems />
      <MyCartGroupItems />
    </>
  );
};

export default memo(MyCartList);
