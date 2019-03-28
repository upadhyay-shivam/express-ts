import { BaseService } from "../shared/base.service";
import { Provides, Inject } from "typescript-ioc";
import { User, UserModel } from './models/user.model';
import { MapperService } from "../shared/mapper/mapper.service";
import { IRegisterUserParams } from "./models/view-models/create-request-params";
import * as jwt from 'jsonwebtoken';
import { InstanceType } from 'typegoose';
import { ConfigurationService } from "../shared/configuration/configuration.service";
import { Configuration } from "../shared/configuration/config.enum";
import * as bcrypt from 'bcrypt';
import { UserVm } from "./models/view-models/user-vm";
import * as error from 'http-errors';
import { ILoginParams } from "./models/view-models/login-params";
@Provides(UserService)
export class UserService extends BaseService<User> {
    constructor(
        @Inject private $mapperService: MapperService,
        @Inject private $configurationService: ConfigurationService
    ) {
        super(UserModel, $mapperService.mapper);
    };
    async getMsg(): Promise<string> {
        return 'hello';

    }
    async  login(params: ILoginParams): Promise<any> {
        if (!params.email) {
            throw error(403, 'Email is required');
        }
        try {
            const existUser = await this.findOne({ email: params.email });

            if (!existUser) {
                throw error(403, 'Wrong credentials');

            }
            const isMatch = await bcrypt.compare(params.password, existUser.password);
            if (!isMatch) {
                throw error(403, 'Wrong credentials');

            }
            const token = await jwt.sign({
                email: params.email,
                iat: new Date().getUTCMilliseconds()
            }, this.$configurationService.get(Configuration.JWT));
            return {
                token: token,
                user: existUser
            }
        } catch (e) {
            throw error(500, e);

        }

    }
    async createUser(params: IRegisterUserParams): Promise<UserVm> {
        if (!params.email) {
            throw error(403, 'Email is required');
        }
        try {
            const existUser = await this.findOne({ email: params.email });
            if (existUser) {
                throw error(403, 'User already Exists');

            }
        } catch (e) {
            throw error(500, e);

        }
        params.password = await bcrypt.hash(params.password, 10);
        const newUser = new this._model(params);
        try {
            return await this.create(newUser) as UserVm;
        } catch (e) {
            throw error(500, e);
        }

    }
}
