import { Meteor } from "meteor/meteor";
import Collections from "../collections";
import { check } from "meteor/check";
import { NotificationTypes } from "../collections/notification";

Meteor.methods({
  messageAddMessage(body: { toUserId: string; message: string }): string {
    const { toUserId, message } = body;
    const currentUserId = this.userId;
    check(toUserId, String);
    check(message, String);

    if (!currentUserId) {
      throw new Meteor.Error("Invalid request");
    }

    const messageId = Collections.Message.insert({
      message,
      fromUserId: currentUserId,
      isRead: false,
      toUserId,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    const existingUnread1 = Collections.UnReadMessage.findOne({
      fromUserId: currentUserId,
      toUserId,
    });
    const existingUnread2 = Collections.UnReadMessage.findOne({
      fromUserId: toUserId,
      toUserId: currentUserId,
    });
    const lastMessage = Collections.Message.findOne(messageId);
    if (!existingUnread1) {
      Collections.UnReadMessage.insert({
        fromUserId: currentUserId,
        toUserId,
        unReadCount: 0,
      });
    }
    if (!existingUnread2) {
      Collections.UnReadMessage.insert({
        fromUserId: toUserId,
        toUserId: currentUserId,
        unReadCount: 0,
      });
    }
    Collections.UnReadMessage.update(
      {
        fromUserId: currentUserId,
        toUserId,
      },
      {
        $inc: {
          unReadCount: 1,
        },
        $set: {
          lastMessage,
        },
      }
    );
    Collections.UnReadMessage.update(
      {
        fromUserId: toUserId,
        toUserId: currentUserId,
      },
      {
        $set: {
          lastMessage,
        },
      }
    );

    Collections.Notification.remove({
      userId: toUserId,
      type: NotificationTypes.NEW_MESSAGE,
      "params.fromUserId": this.userId,
    });
    Collections.Notification.insert({
      isRead: false,
      type: NotificationTypes.NEW_MESSAGE,
      userId: toUserId,
      params: {
        message: lastMessage,
        fromUserId: this.userId,
        toUserId,
        fromUser: Meteor.users.findOne(this.userId as string),
        toUser: Meteor.users.findOne(toUserId),
      },
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    return messageId;
  },

  messageSetReadMessage(body: {
    messageIds: string[];
    fromUserId: string;
  }): void {
    const { messageIds, fromUserId } = body;
    const currentUserId = this.userId;
    check(messageIds, [String]);
    check(fromUserId, String);

    if (!currentUserId) {
      throw new Meteor.Error("Invalid request");
    }
    Collections.Message.update(
      {
        _id: { $in: messageIds },
      },
      {
        $set: {
          isRead: true,
        },
      },
      {
        multi: true,
      }
    );

    Collections.UnReadMessage.update(
      {
        toUserId: currentUserId,
        fromUserId,
      },
      {
        $inc: {
          unReadCount: -messageIds.length,
        },
      }
    );
  },
});
