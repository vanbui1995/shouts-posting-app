import { Mongo } from 'meteor/mongo';
import { IBaseDocument } from './base';

export interface IMessage extends IBaseDocument {
    _sid: string;
    message: string;
    isRead: boolean;
    fromUserId: string;
    toUserId: string;
}

export const MessageCollection = new Mongo.Collection<IMessage>('messages');





