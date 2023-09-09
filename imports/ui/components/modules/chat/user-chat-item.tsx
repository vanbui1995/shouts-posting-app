import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { IUserProfile } from "../../../../type/general";
import { IUnReadMessage } from "../../../../api/collections/unread-message";

type IProps = {
  isActive: boolean;
  member: Meteor.User;
  unreadMessageItem: IUnReadMessage | undefined;
};

const UserChatItem = (props: IProps) => {
  const navigate = useNavigate();
  const { isActive, member, unreadMessageItem } = props;
  const profile = member?.profile as IUserProfile;
  return (
    <div
      className={`flex-1 px-[1rem] py-[0.75rem] cursor-pointer hover:bg-lightgrey transition: all ease-in 2s; ${
        isActive ? "bg-lightgrey" : ""
      }`}
      onClick={() => {
        navigate(`/app/${member._id}`);
      }}
    >
      <div className="flex gap-[1rem]">
        <img
          src={profile.image}
          className="w-[3rem] h-[3rem] rounded-full object-cover"
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex justify-between">
            <span className="font-semibold">{profile.name}</span>
            {unreadMessageItem?.lastMessage?.createdAt && (
              <span className="text-navy text-[0.75rem]">
                {dayjs(unreadMessageItem?.lastMessage?.createdAt).format(
                  "HH:mm"
                )}
              </span>
            )}
          </div>
          <div className="relative overflow-hidden">
            <span className="text-[0.875rem] text-navy pr-[2rem] text-ellipsis overflow-hidden whitespace-nowrap block">
              {unreadMessageItem?.lastMessage?.message}
            </span>
            {!!unreadMessageItem?.unReadCount &&
              unreadMessageItem?.unReadCount > 0 && (
                <span className="absolute top-0 right-0 text-[0.75rem] w-[1rem] h-[1rem] bg-lightgreen rounded-full flex justify-center items-center text-white">
                  {unreadMessageItem?.unReadCount}
                </span>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChatItem;
