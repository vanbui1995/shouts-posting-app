import { Meteor } from "meteor/meteor";
import Collections from "../collections";
import { check, Match } from "meteor/check";

export const methods: {
  [key: string]: (this: Meteor.MethodThisType, ...args: any[]) => any;
} = {
  messageAddMessage(body: { message: string }): string {
    const { message } = body;
    const currentUserId = this.userId;
    check(message, String);

    if (!message) {
      throw new Meteor.Error('Bad request', 'Message is empty string')
    }

    if (!currentUserId) {
      throw new Meteor.Error("Invalid request", "Missing authentication");
    }

    const messageId = Collections.Message.insert({
      message,
      fromUserId: currentUserId,
      fromUser: Meteor.users.findOne(
        { _id: currentUserId },
        {
          fields: {
            profile: 1,
          },
        }
      ),
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    return messageId;
  },

  messageUpdateMessage(body: {
    messageId: string;
    updatedMesssage: string;
  }): number {
    const { messageId, updatedMesssage } = body;
    const currentUserId = this.userId;
    check(messageId, String);
    check(updatedMesssage, String);

    if (!updatedMesssage) {
      throw new Meteor.Error('Bad request', 'Message is empty string')
    }

    if (!currentUserId) {
      throw new Meteor.Error("Invalid request", "Missing authentication");
    }

    // Make sure the updated message belong to the sender
    const changedNumber = Collections.Message.update(
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

    return changedNumber;
  },
  messageDeleteMessage(body: { messageId: string }): string {
    const { messageId } = body;
    const currentUserId = this.userId;
    check(messageId, String);

    

    if (!currentUserId) {
      throw new Meteor.Error("Invalid request", "Missing authentication");
    }

    // Make sure the deleted message belong to the sender
    Collections.Message.remove({
      fromUserId: currentUserId,
      _id: messageId,
    });

    return messageId;
  },
};



Meteor.methods(methods);
