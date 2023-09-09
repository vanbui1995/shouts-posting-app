import { Meteor } from "meteor/meteor";
import Collections from "../collections";
import { check } from "meteor/check";
import { NotificationTypes } from "../collections/notification";

Meteor.methods({
  notificationSetRead(body: { notiId: string }): void {
    const { notiId } = body;
    const currentUserId = this.userId;
    check(notiId, String);

    if (!currentUserId) {
      throw new Meteor.Error("Invalid request");
    }

    // Make sure the notification belong to the current by using query
    Collections.Notification.update(
      {
        _id: notiId,
        userId: currentUserId,
      },
      {
        $set: {
          isRead: true,
        },
      }
    );
  },
});
