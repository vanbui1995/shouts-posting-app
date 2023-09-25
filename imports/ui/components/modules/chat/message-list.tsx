import React, { useContext, useEffect, useRef } from "react";
import MessageItem from "./message-item";
import TextEntry from "./text-entry";
import { ChatBoardContext } from "../../../contexts/chat-board-context";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import Collections from "../../../../api/collections";
import { MeteorCall } from "../../../utils/general";

const MessageList = () => {
  useSubscribe("message:loadMessage");
  const refScroll = useRef<HTMLSpanElement | null>(null);

  const messages = useFind(
    () =>
      Collections.Message.find(
        {},
        {
          sort: {
            createdAt: -1,
          },
        }
      ),
    []
  );

  useEffect(() => {
    refScroll.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col ">
      <div className="flex flex-1 bg-iceberg justify-center w-full relative pr-[0.714rem]">
        <div className="h-[calc(100vh-142px)] max-w-[650px]  w-[90%] pt-[1.714rem] mb-[86px] gap-[1rem] flex flex-col-reverse overflow-y-auto">
          <span ref={refScroll}></span>
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
