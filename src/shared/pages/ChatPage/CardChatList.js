import { memo } from "react";
import CardChatItem from "./CardChatItem";

const CardChatList = () => {
  return (
    <>
      <CardChatItem />
      <CardChatItem />
      <CardChatItem />
      <CardChatItem />
      <CardChatItem />
      <CardChatItem />
      <CardChatItem />
      <CardChatItem />
    </>
  );
};

export default memo(CardChatList);
