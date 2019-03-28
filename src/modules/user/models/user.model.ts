
import { prop, Typegoose } from 'typegoose';
import UserRoles from './role.enum';
import { schemaOptions } from '../../shared/base.model';
class User extends Typegoose {
    @prop()
    name?: string;
    @prop({ required: true, unique: true })
    email?: string;
    @prop({ minlength: 6 })
    password?: string;
    @prop({ enum: UserRoles, default: UserRoles.ADMIN })
    roles: UserRoles
}

const UserModel = new User().getModelForClass(User, {
    schemaOptions: Object.assign({},
        schemaOptions,
        {
            toJSON: {
                // @TODO: Leverage automapper if possible
                transform(doc, ret, options) {
                    delete ret.password;
                    ret.id = ret._id;
                    delete ret._id;
                    delete ret.__v;
                },
            },
        },
    ),
});

export { User, UserModel }