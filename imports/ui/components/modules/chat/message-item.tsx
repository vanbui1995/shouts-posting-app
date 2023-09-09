import React, { useContext } from "react";
import dayjs from "dayjs";
import { IMessage } from "../../../../api/collections/messages";
import { ChatBoardContext } from "../../../contexts/chat-board-context";

const MessageItem = (props: { messageData: IMessage }) => {
  const { messageData } = props;
  const { fromUserId } =
    useContext(ChatBoardContext);

  const isMyMessage = messageData.fromUserId === fromUserId;
  return (
    <div className={`flex ${!isMyMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex px-[0.857rem] py-[4px] gap-0.357rem flex-col max-w-[60%] ${
          !isMyMessage ? "bg-lightgreen" : "bg-white"
        }  rounded-[0.857rem]`}
      >
        <span>{messageData.message}</span>
        <div className="flex justify-end">
          <span className="text-[0.714rem]">
            {/* @ts-ignore */}
            {dayjs().from(dayjs(messageData.createdAt))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
