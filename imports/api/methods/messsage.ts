import { Meteor } from "meteor/meteor";
import Collections from "../collections";
import { check } from "meteor/check";

Meteor.methods({
  messageAddMessage(body: { toUserId: string; message: string }): string {
    const { message } = body;
    const currentUserId = this.userId;
    check(message, String);

    if (!currentUserId) {
      throw new Meteor.Error("Invalid request");
    }

    const messageId = Collections.Message.insert({
      message,
      fromUserId: currentUserId,
      fromUser: Meteor.users.findOne({ _id: currentUserId }, {
        fields: {
          profile: 1,
        }
      }),
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    return messageId;
  },

  messageUpdateMessage(body: {
    messageId: string;
    updatedMesssage: string;
  }): string {
    const { messageId, updatedMesssage } = body;
    const currentUserId = this.userId;
    check(messageId, String);
    check(updatedMesssage, String);

    if (!currentUserId) {
      throw new Meteor.Error("Invalid request");
    }

    // Make sure the updated message belong to the sender
    Collections.Message.update(
      {
        fromUserId: currentUserId,
        _id: messageId,
      },
      {
        $set: {
          message: updatedMesssage,
        },
      }
    );

    return messageId;
  },
  messageDeleteMessage(body: { messageId: string }): string {
    const { messageId } = body;
    const currentUserId = this.userId;
    check(messageId, String);

    if (!currentUserId) {
      throw new Meteor.Error("Invalid request");
    }

    // Make sure the deleted message belong to the sender
    Collections.Message.remove({
      fromUserId: currentUserId,
      _id: messageId,
    });

    return messageId;
  },
});
