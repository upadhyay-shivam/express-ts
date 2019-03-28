import { Document, SchemaOptions } from 'mongoose';

export interface BaseModel extends Document {
    createdAt?: Date;
    updatedAt?: Date;
}
export class BaseModelVm {
    createdAt?: Date;
    updatedAt?: Date;
    id?: string;
}

export const schemaOptions: SchemaOptions = {
    toJSON: {
        virtuals: true,
        getters: true,
    }

}