import dayjs from "dayjs";
// @ts-ignore
import { SyncedCron } from "meteor/littledata:synced-cron";
import Collections from "../collections";
import { NotificationTypes } from "../collections/notification";

// set 60 for the excercise requirement, but can set = 1 or 2, 3 minutes to easier to testing
const CONFIG_UNREAD_MESSAGE_IN_MINUTES = 2;

function checkUnreadForUser(user: Meteor.User) {
  console.log("Start check unread for user", user?.username);
  const currentTime = new Date();

  const existingUnReadMessage = Collections.Message.findOne(
    {
      isRead: false,
      toUserId: user._id,
      createdAt: {
        $lte: dayjs(currentTime)
          .subtract(CONFIG_UNREAD_MESSAGE_IN_MINUTES, "minute")
          .toDate(),
      },
    },
    {
      sort: {
        createdAt: -1,
      },
    }
  );

  

  // Check if we have existing notification for this message, we should not add again the notification
  const exitingNotification = existingUnReadMessage && Collections.Notification.findOne({
    type: NotificationTypes.UNREAD_MESSAGE_1_HOUR,
    userId: user._id,
    "params.fromUserId": existingUnReadMessage?.fromUserId,
    "params.message._id": existingUnReadMessage._id,
  });


  if (existingUnReadMessage && !exitingNotification) {
    const fromUser = Meteor.users.findOne(existingUnReadMessage.fromUserId);
    Collections.Notification.insert({
      isRead: false,
      type: NotificationTypes.UNREAD_MESSAGE_1_HOUR,
      userId: user._id,
      params: {
        message: existingUnReadMessage,
        fromUserId: existingUnReadMessage.fromUserId,
        toUserId: existingUnReadMessage.toUserId,
        fromUser: fromUser,
        toUser: user,
      },
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
  }
}

export function initJob() {
  SyncedCron.add({
    name: "Run every minute to check any unread message in $CONFIG_UNREAD_MESSAGE_IN_MINUTES minutes and create notifiation",
    schedule: function (parser) {
      // parser is a later.parse object
      return parser.text("every 1 minute");
    },
    job: function () {
      console.log("Start the job check unread message");
      // Check forever user
      const users = Meteor.users
        .find(
          {},
          {
            fields: {
              id: 1,
              profile: 1,
              username: 1,
            },
          }
        )
        .fetch();

      // We can seperate job here, but for this excersice, i will skip it
      users.forEach((user) => checkUnreadForUser(user));
      console.log("End the job check unread message");
    },
  });
}
