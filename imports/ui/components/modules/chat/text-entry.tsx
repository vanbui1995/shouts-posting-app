import React, { useContext, useState } from "react";
import { MeteorCall } from "../../../utils/general";
import SendIcon from "../../icons/SendIcon";
import { ChatBoardContext } from "../../../contexts/chat-board-context";

const TextEntry = () => {
  const [message, setMessage] = useState("");
  const { toUser, profile, fromUserId, toUserId } =
    useContext(ChatBoardContext);

  const handleAddMessage: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      const result = MeteorCall("messageAddMessage", {
        toUserId,
        message,
      });
      setMessage("");
    } catch (error) {
      window.prompt(
        "Unexpected error when sending the message, please try again"
      );
    }
  };
  return (
    <div className="bg-white h-[4rem] max-w-[650px] w-[90%] rounded-xl px-[1rem] py-[0.5rem] absolute bottom-[1rem]">
      <div className="">
        <form className="mb-4 flex items-center" onSubmit={handleAddMessage}>
          <input
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            type="text"
            className="w-full rounded-lg border-opacity-0 p-2"
            placeholder="Typing messasge here..."
          />
          <button
            type="submit"
            className="ml-2 rounded-lg bg-blue-500 p-2 hover:bg-blue-600"
          >
            <SendIcon className="fill-iceberg" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default TextEntry;
