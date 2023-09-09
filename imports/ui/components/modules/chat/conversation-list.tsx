import React, { useEffect, useRef } from "react";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import { useNavigate, useParams } from "react-router-dom";
import UserChatItem from "./user-chat-item";
import Collections from "../../../../api/collections";

const ConversationList = () => {
  useSubscribe("user:getAllUsers");
  useSubscribe("message:getAllMyUnReadMessage");

  let { userId } = useParams();
  const checkRedirect = useRef(!!userId);
  const navigate = useNavigate();
  const unreadData = useFind(
    () =>
      Collections.UnReadMessage.find({
        toUserId: Meteor.userId() as string,
      }),
    []
  );
  const members = useFind(
    () =>
      Meteor.users.find(
        {
          _id: { $ne: Meteor.userId() as string },
        },
        {
          fields: {
            _id: 1,
            username: 1,
            profile: 1,
          },
        }
      ),
    []
  );

  // Redirect to first conversation
  useEffect(() => {
    if (members.length && !checkRedirect.current) {
      navigate(`/app/${members[0]._id}`, {
        replace: true,
      });
      checkRedirect.current = true;
    }
  }, [members]);

  return (
    <div className="chat-list w-[18.929rem] h-full overflow-y-auto border-r-[1px] border-solid border-[#D9DCE0] max-md:hidden">
      {members.map((member) => {
        const unreadMessageItem = unreadData.find(
          (item) => item.fromUserId === member._id
        );
        return (
          <UserChatItem
            key={member._id}
            member={member}
            isActive={userId === member._id}
            unreadMessageItem={unreadMessageItem}
          />
        );
      })}
    </div>
  );
};

export default ConversationList;
