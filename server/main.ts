import { Meteor } from "meteor/meteor";
// @ts-ignore


import "../imports/api/methods";
import "../imports/api/publications";
import Collections from "../imports/api/collections";


Meteor.startup(async () => {
  // Seeding Db
  const user = Meteor.users.findOne();
  if (!user) {
    Accounts.createUser({
      username: "user1",
      profile: {
        name: "John Doe",
        image: "https://images.unsplash.com/photo-1612469294274-b1baaf5125ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGVyc29ufHx8fHx8MTY5NDI0MjA4Nw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300",
      },
      password: "123456",
    });
    Accounts.createUser({
      username: "user2",
      profile: {
        name: "Cris Ronaldo",
        image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGVyc29ufHx8fHx8MTY5NDI0MjA3OQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300",
      },
      password: "123456",
    });
    Accounts.createUser({
      username: "user3",
      profile: {
        name: "Lionel Messi",
        image: "https://images.unsplash.com/photo-1600783486189-553f6a73f6f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGVyc29ufHx8fHx8MTY5NDI0MjA4NA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300",
      },
      password: "123456",
    });
  }
});
