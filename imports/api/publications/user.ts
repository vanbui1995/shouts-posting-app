Meteor.publish("user:currentUser", function () {
  if (Meteor.userId()) return Meteor.users.find({ _id: this.userId as string });
  return this.ready();
});

Meteor.publish("user:getAllUsers", function () {
  if (!Meteor.userId()) {
    return this.ready();
  }
  return Meteor.users.find(
    {},
    {
      fields: {
        _id: 1,
        username: 1,
        profile: 1,
      },
    }
  );
});
