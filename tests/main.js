import assert from "assert";
import _pick from "lodash/pick";
import { methods } from "../imports/api/methods/messsage";
import Collections from "../imports/api/collections";
import { Match } from "meteor/check";

describe("MessageMethodAPI - messageAddMessage", function () {
  it("messageAddMessage - Add message successfully", () => {
    const context = {
      userId: "vanbui_id",
    };
    const messageAddMessage = methods.messageAddMessage.bind(context);
    const messageId = messageAddMessage({ message: "new message 1" });
    const insertedMessage = Collections.Message.findOne(messageId);
    // Expect message inserted to our database
    assert.deepEqual(
      {
        _id: messageId,
        message: "new message 1",
        fromUserId: context.userId,
      },
      _pick(insertedMessage, ["_id", "message", "fromUserId"])
    );
  });

  it("messageAddMessage - Fail to add message due to message input is invalid - null", () => {
    const context = {
      userId: null,
    };
    const messageAddMessage = methods.messageAddMessage.bind(context);
    assert.throws(function () {
      messageAddMessage({ message: "new message 2" });
    }, Meteor.Error('Bad request', 'Message is empty string'));
    const matchMessage = Collections.Message.findOne({
      message: "new message 2",
    });
    assert.equal(matchMessage, null);
  });

  it("messageAddMessage - Fail to add message due to message input is invalid - empty string", () => {
    const context = {
      userId: null,
    };
    const messageAddMessage = methods.messageAddMessage.bind(context);
    assert.throws(function () {
      messageAddMessage({ message: "" });
    }, Meteor.Error("Bad request", "Message is empty string"));
  });

  it("messageAddMessage - Fail to add message due to missing authentication", () => {
    const context = {
      userId: "vanbui_id",
    };
    const messageAddMessage = methods.messageAddMessage.bind(context);
    assert.throws(function () {
      messageAddMessage({ message: null });
    }, Meteor.Error("Invalid request", "Missing authentication"));
  });
});

describe("MessageMethodAPI - messageUpdateMessage", function () {
  it("messageUpdateMessage - Update message successfully", () => {
    const context = {
      userId: "vanbui_id",
    };
    const messageUpdateMessage = methods.messageUpdateMessage.bind(context);
    Collections.Message.insert({
      _id: "messsage1",
      message: "new message 1",
      fromUserId: context.userId,
    });
    const numberChanged = messageUpdateMessage({ messageId: "messsage1", updatedMesssage: "new message 1 - updated" });
    const updatedMessage = Collections.Message.findOne('messsage1');
    // Expect message inserted to our database
    assert.deepEqual(
      {
        _id: "messsage1",
        message: "new message 1 - updated",
        fromUserId: context.userId,
      },
      updatedMessage,
    );
    assert.equal(numberChanged, 1);
  });

  it("messageUpdateMessage - Update message failed due to missing authentication", () => {
    const context = {
      userId: null,
    };
    const messageUpdateMessage = methods.messageUpdateMessage.bind(context);
    const originalMessage = {
      _id: "messsage10",
      message: "new message 1",
      fromUserId: context.userId,
    };
    Collections.Message.insert(originalMessage);

    assert.throws(function () {
      messageUpdateMessage({ messageId: "messsage10", updatedMesssage: "new message 1 - updated" });
    }, Meteor.Error("Invalid request", "Missing authentication"));
    const updatedMessage = Collections.Message.findOne('messsage10');
    // Expect the message is unchanged
    assert.deepEqual(
      originalMessage,
      updatedMessage,
    );
  });

  it("messageUpdateMessage - Update message failed due to message", () => {
    const context = {
      userId: null,
    };
    const messageUpdateMessage = methods.messageUpdateMessage.bind(context);
    const originalMessage = {
      _id: "messsage10",
      message: "new message 1",
      fromUserId: context.userId,
    };
    Collections.Message.insert(originalMessage);

    assert.throws(function () {
      messageUpdateMessage({ messageId: "messsage10", updatedMesssage: "new message 1 - updated" });
    }, Meteor.Error("Invalid request", "Missing authentication"));
    const updatedMessage = Collections.Message.findOne('messsage10');
    // Expect the message is unchanged
    assert.deepEqual(
      originalMessage,
      updatedMessage,
    );
  });
});
