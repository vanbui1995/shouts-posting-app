import { check } from "meteor/check";
import Collections from "../collections";

Meteor.publish("message:loadMessage", function (toUserId: string) {
  check(toUserId, String);
  if (this.userId) {
    return Collections.Message.find({
      $or: [
        {
          toUserId,
          fromUserId: this.userId,
        },
        {
          toUserId: this.userId,
          fromUserId: toUserId,
        },
      ],
    });
  }

  return this.ready();
});

Meteor.publish("message:getAllMyUnReadMessage", function () {
  if (this.userId) {
    return Collections.UnReadMessage.find({
      toUserId: this.userId,
    });
  }
  return this.ready();
});
