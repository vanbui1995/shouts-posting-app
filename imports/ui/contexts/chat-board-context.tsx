import { createContext } from "react"

import { IUserProfile } from "../../type/general";

interface IChatBoardContext {
  toUserId?: string | null;
  fromUserId?: string | null;
  toUser?: Meteor.User | null;
  profile?: IUserProfile;
}

export const ChatBoardContext = createContext<IChatBoardContext>({});


