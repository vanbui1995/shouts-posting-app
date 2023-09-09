import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import {
  INotification,
  NotificationTypes,
} from "../../../../api/collections/notification";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import Collections from "../../../../api/collections";
import { IUserProfile } from "../../../../type/general";
import { MeteorCall } from "../../../utils/general";


const NotificationItem = (props: { noti: INotification }) => {
  const { noti } = props;
  const navigate = useNavigate();

  const handleClickNoti = (e) => {
    e.preventDefault();
    switch (noti.type) {
      case NotificationTypes.UNREAD_MESSAGE_1_HOUR:
      case NotificationTypes.NEW_MESSAGE:
        // Navigate to chat with the user that sent this message
        navigate(`/app/${noti.params.fromUserId}`);
        break;
      default:
    }
    MeteorCall("notificationSetRead", {
      notiId: noti._id,
    });
  };

  const renderContentBasedOnType = () => {
    const fromUserProfile = noti?.params?.fromUser?.profile as IUserProfile;
    switch (noti.type) {
      case NotificationTypes.UNREAD_MESSAGE_1_HOUR:
        return (
          <span className="text-[0.85rem] leading-[0.85rem]">
            <span className="text-[0.85rem] leading-[0.85rem] font-bold">
              {fromUserProfile.name}
            </span>{" "}
            sent you an message that you have not read it yet in 1 hour: "
            {noti?.params?.message?.message.slice(0, 10)}
            ..."
          </span>
        );
      case NotificationTypes.NEW_MESSAGE:
        return (
          <span className="text-[0.85rem] leading-[0.85rem]">
            <span className="text-[0.85rem] leading-[0.85rem] font-bold">
              {fromUserProfile.name}
            </span>{" "}
            sent you a new message: "
            {noti?.params?.message?.message.slice(0, 10)}
            ..."
          </span>
        );
      default:
        return <span>Default notification content</span>;
    }
  };
  return (
    <li
      onClick={handleClickNoti}
      className="p-2 border-b-[1px] border-solid border-[#D9DCE0] pr-[2rem] relative hover:bg-[#f5f5f5] cursor-pointer mx-[-0.5rem]"
    >
      <span className="text-[0.85rem] leading-[0.85rem]">
        {renderContentBasedOnType()}
      </span>
      <br />
      <span className="text-[0.714rem] text-grey">
        {/* @ts-ignore */}
        {dayjs().from(dayjs(noti.createdAt))}
      </span>
      {!noti.isRead && (
        <div className="absolute w-[0.571rem] h-[0.571rem] bg-[#009aff] top-[1rem] right-4 rounded-full"></div>
      )}
    </li>
  );
};

export const useNotification = () => {
  useSubscribe("notification:my");
  const notifications = useFind(
    () =>
      Collections.Notification.find(
        {
          userId: Meteor.userId() as string,
        },
        {
          sort: {
            createdAt: -1,
          },
        }
      ),
    []
  );
  const unreadCount = notifications.filter((noti) => !noti.isRead).length;
  return  { notifications, unreadCount };
};

const Notification = () => {
  const { notifications, unreadCount } = useNotification();
  return (
    <div className="p-5">
      <div className="font-bold">Notifications ({unreadCount})</div>

      <ul className="mt-5">
        {notifications.map((item) => (
          <NotificationItem key={item._id} noti={item} />
        ))}
      </ul>
    </div>
  );
};

export default Notification;
