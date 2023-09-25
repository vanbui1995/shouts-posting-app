import { Mongo } from 'meteor/mongo';
import { IBaseDocument } from './base';

export interface IMessage extends IBaseDocument {
    _id: string;
    message: string;
    fromUserId: string;
    fromUser: Meteor.User;
}

export const MessageCollection = new Mongo.Collection<IMessage>('messages');





