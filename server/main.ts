import { Meteor } from "meteor/meteor";
// @ts-ignore
import { SyncedCron } from "meteor/littledata:synced-cron";

import { initJob } from '../imports/api/job-handlers/one-hour-un-read-noti'

import "../imports/api/methods";
import "../imports/api/publications";


Meteor.startup(async () => {

  initJob();
  SyncedCron.start();




  // Seeding Db
  const user = Meteor.users.findOne();
  if (!user) {
    Accounts.createUser({
      username: "user1",
      profile: {
        name: "John Doe",
        image: "https://source.unsplash.com/random/48%C3%9748/?user",
      },
      password: "123456",
    });
    Accounts.createUser({
      username: "user2",
      profile: {
        name: "Cris Ronaldo",
        image: "https://source.unsplash.com/random/48%C3%9748/?ronaldo",
      },
      password: "123456",
    });
    Accounts.createUser({
      username: "user3",
      profile: {
        name: "Lionel Messi",
        image: "https://source.unsplash.com/random/48%C3%9748/?messi",
      },
      password: "123456",
    });
  }
});
