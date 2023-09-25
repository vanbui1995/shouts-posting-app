import React, { useContext, useRef } from "react";
import dayjs from "dayjs";
import { IMessage } from "../../../../api/collections/messages";
import { ChatBoardContext } from "../../../contexts/chat-board-context";
import { MeteorCall } from "../../../utils/general";
import { IUserProfile } from "../../../../type/general";

const MessageItem = (props: { messageData: IMessage }) => {
  const { messageData } = props;
  const state = useContext(ChatBoardContext);
  const { fromUserId, editMessageId } = state;
  const setEditMessageId = state.setEditMessageId as React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  const setMessage = state.setMessage as React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;

  const handleRemove = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (confirm("Are you sure to proceed it?") == true) {
      try {
        await MeteorCall("messageDeleteMessage", {
          messageId: messageData._id,
        });
      } catch (error) {
        alert("Unexpected error, please try again!");
      }
    }
  };

  const handleEdit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setEditMessageId(messageData._id);
    setMessage(messageData.message);
  };

  const isMyMessage = messageData.fromUserId === fromUserId;
  return (
    <div className={`flex ${!isMyMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex relative px-[0.857rem] py-[4px] gap-0.357rem flex-col max-w-[60%] ${
          !isMyMessage ? "bg-lightgreen" : "bg-white"
        }  rounded-[0.857rem]`}
      >
        <span>{messageData.message}</span>
        <div className="flex justify-end">
          <span className="text-[0.714rem]">
            {/* @ts-ignore */}
            <b>
              {isMyMessage
                ? "You"
                : `${(messageData?.fromUser?.profile as IUserProfile).name}`}
            </b>{" "}
            - {dayjs().from(dayjs(messageData.createdAt))}
          </span>
        </div>
        {isMyMessage && (
          <div className="absolute right-[-2rem] flex flex-col h-full">
            {editMessageId === messageData._id && (
              <button
                onClick={() => {
                  setEditMessageId(null);
                }}
                type="button"
              >
                <img
                  className="w-[1.3rem] h-[1.3rem] cursor-pointer"
                  src="/back-square-svgrepo-com.svg"
                />
              </button>
            )}
            {editMessageId !== messageData._id && (
              <button onClick={handleEdit} type="button">
                <img
                  className="w-[1.5rem] h-[1.5rem] cursor-pointer"
                  src="/edit-svgrepo-com.svg"
                />
              </button>
            )}

            <button onClick={handleRemove} type="button">
              <img
                className="w-[1.3rem] h-[1.3rem cursor-pointer"
                src="/delete-svgrepo-com.svg"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
