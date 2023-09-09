import React, { useContext, useEffect } from "react";
import MessageItem from "./message-item";
import TextEntry from "./text-entry";
import { ChatBoardContext } from "../../../contexts/chat-board-context";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import Collections from "../../../../api/collections";
import { MeteorCall } from "../../../utils/general";

const MessageList = () => {
  const { toUser, profile, fromUserId, toUserId } =
    useContext(ChatBoardContext);

  useSubscribe("message:loadMessage", toUserId);

  const messages = useFind(
    () =>
      Collections.Message.find(
        {
          $or: [
            {
              toUserId: toUserId as string,
              fromUserId: fromUserId as string,
            },
            {
              toUserId: fromUserId as string,
              fromUserId: toUserId as string,
            },
          ],
        },
        {
          sort: {
            createdAt: -1,
          },
        }
      ),
    [toUserId]
  );

  useEffect(() => {
    const unReadMessage = messages.filter(
      (message) => message.isRead === false && message.fromUserId === toUserId
    );
    if (unReadMessage.length) {
      MeteorCall("messageSetReadMessage", {
        messageIds: unReadMessage.map((message) => message._id),
        fromUserId: toUserId,
      });
    }
  }, [messages]);
  return (
    <div className="flex flex-1 flex-col ">
      <div className="flex flex-1 bg-iceberg justify-center w-full relative pr-[0.714rem]">
        <div className="h-[calc(100vh-142px)] max-w-[650px]  w-[90%] pt-[1.714rem] mb-[86px] gap-[1rem] flex flex-col-reverse overflow-y-auto">
          {messages.map((item) => (
            <MessageItem key={item._id} messageData={item} />
          ))}
        </div>
        <TextEntry />
      </div>
    </div>
  );
};

export default MessageList;
