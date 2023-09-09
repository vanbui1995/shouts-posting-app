import { Mongo } from 'meteor/mongo';
import * as MongoNpmModule from 'mongodb';
import { IBaseDocument } from './collections/base';

interface IConversation extends IBaseDocument {
    id: string;
    userIds: string[];
    ownerId: string;
}

export const ConversationCollection = new Mongo.Collection<IConversation>('conversations');



