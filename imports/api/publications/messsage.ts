import { check } from "meteor/check";
import Collections from "../collections";

Meteor.publish("message:loadMessage", function () {
  // Check only logged user can sub the messasges
  if (this.userId) {
    return Collections.Message.find({});
  }

  return this.ready();
});

