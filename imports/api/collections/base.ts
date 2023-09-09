import * as MongoNpmModule from 'mongodb';

export interface IBaseDocument extends MongoNpmModule.Document {
    createdAt: Date;
    deletedAt: Date;
    modifiedAt: Date;
}


