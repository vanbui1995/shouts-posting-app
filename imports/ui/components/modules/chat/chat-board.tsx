import React from "react";
import { useParams } from "react-router-dom";

import MessageList from "./message-list";
import { useFind } from "meteor/react-meteor-data";
import { ChatBoardContext } from "../../../contexts/chat-board-context";
import { IUserProfile } from "../../../../type/general";

const ChatBoard = () => {
  const { userId } = useParams();
  const members = useFind(() => Meteor.users.find({ _id: userId }), [userId]);
  const currentMember = members.length ? members[0] : null;
  const profile = currentMember?.profile as IUserProfile;

  return (
    <ChatBoardContext.Provider
      value={{
        fromUserId: Meteor.userId(),
        toUserId: userId,
        profile,
        toUser: currentMember,
      }}
    >
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="h-[3.5rem] flex gap-[1rem] w-full px-[1rem] py-[0.5rem] border-b-[1px] border-solid border-[#D9DCE0]">
          <img
            src={profile?.image}
            className="w-[2.5rem] h-[2.5rem] rounded-full object-cover"
          />
          <div className="flex justify-between flex-col">
            <span className="font-semibold leading-[1.25rem]">
              {profile?.name}
            </span>
            <span className="leading-[1.125rem] text-[0.875rem] text-navy text-ellipsis">
              {currentMember?.username}
            </span>
          </div>
        </div>
        <MessageList />
      </div>
    </ChatBoardContext.Provider>
  );
};

export default ChatBoard;
