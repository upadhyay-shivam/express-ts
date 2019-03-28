import { SchemaOptions } from 'mongoose';
import { Typegoose, prop, pre } from 'typegoose';

@pre('findOneAndUpdate', function (next) {
    this._update.updatedAt = new Date(Date.now());
    next();
})
export class BaseModel<T> extends Typegoose {
    @prop({ default: Date.now() })
    createdAt?: Date;

    @prop({ default: Date.now() })
    updatedAt?: Date;

    id?: string;
}
export class BaseModelVm {
    createdAt?: Date;
    updatedAt?: Date;
    id?: string | number;
}

export const schemaOptions: SchemaOptions = {
    toJSON: {
        virtuals: true,
        getters: true,
    }

}