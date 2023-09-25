import React, { useState } from "react";

import MessageList from "./message-list";
import { ChatBoardContext } from "../../../contexts/chat-board-context";

const ChatBoard = () => {
  const [editMessageId, setEditMessageId] = useState<string | null | undefined>(
    null
  );
  const [message, setMessage] = useState<string | null | undefined>('');

  return (
    <ChatBoardContext.Provider
      value={{
        setMessage,
        message: message,
        fromUserId: Meteor.userId(),
        editMessageId,
        setEditMessageId,
      }}
    >
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="h-[3.5rem] flex gap-[1rem] w-full px-[1rem] py-[0.5rem] border-b-[1px] border-solid border-[#D9DCE0]">
          <img
            src="https://images.unsplash.com/photo-1577046848358-4623c0859b8a?w=200"
            className="w-[2.5rem] h-[2.5rem] rounded-full object-cover"
          />
          <div className="flex justify-between flex-col">
            <span className="font-semibold leading-[1.25rem]">Shoutes</span>
            <span className="leading-[1.125rem] text-[0.875rem] text-navy text-ellipsis">
              Share your "shouts"
            </span>
          </div>
        </div>
        <MessageList />
      </div>
    </ChatBoardContext.Provider>
  );
};

export default ChatBoard;
