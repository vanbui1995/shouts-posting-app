import React, { useContext, useState } from "react";
import { MeteorCall } from "../../../utils/general";
import SendIcon from "../../icons/SendIcon";
import { ChatBoardContext } from "../../../contexts/chat-board-context";

const TextEntry = () => {
  // const [message, setMessage] = useState("");
  const { fromUserId, message, editMessageId, ...rest } =
    useContext(ChatBoardContext);

  const setMessage = rest.setMessage as React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  const setEditMessageId = rest.setEditMessageId as React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;

  const handleAddMessage: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      if (editMessageId) {
        MeteorCall("messageUpdateMessage", {
          messageId: editMessageId,
          updatedMesssage: message,
        });
        setEditMessageId(null);
      } else {
        MeteorCall("messageAddMessage", {
          message,
        });
      }
      setMessage("");
    } catch (error) {
      window.prompt(
        "Unexpected error when sending/updating the message, please try again"
      );
    }
  };
  return (
    <div className="bg-white max-w-[650px] w-[90%] rounded-xl px-[1rem] py-[0.5rem] absolute bottom-[1rem] flex items-center">
      <div className="w-full flex items-center relative">
        <form className="flex w-full flex-col" onSubmit={handleAddMessage}>
          <span className="top-[-1.1rem] left-0 text-[0.75rem]">
            Character count: {(message || "").length}/{280}
          </span>
          <div className="flex items-center w-full">
            <input
              maxLength={280}
              value={message as string}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              type="text"
              className="w-full rounded-lg border-opacity-0 p-2"
              placeholder="Typing your shouts here..."
            />
            <button
              type="submit"
              className="ml-2 rounded-lg bg-blue-500 p-2 hover:bg-blue-600"
            >
              {editMessageId ? "Edit" : <SendIcon className="fill-iceberg" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TextEntry;
