import { createContext } from "react"

import { IUserProfile } from "../../type/general";

interface IChatBoardContext {
  fromUserId?: string | null;
  editMessageId?: string | null;
  setEditMessageId?: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  setMessage?: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  message?: string | null;
}

export const ChatBoardContext = createContext<IChatBoardContext>({

});


