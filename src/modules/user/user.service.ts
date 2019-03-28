import { BaseService } from "../shared/base.service";
import { Provides, Inject } from "typescript-ioc";
import { User, UserModel } from './models/user.model'
import { MapperService } from "../shared/mapper/mapper.service";

@Provides(UserService)
export class UserService extends BaseService<User>{
    constructor(
        @Inject public readonly $mapperService: MapperService
    ) {
        super(UserModel, $mapperService.mapper);
    }
    async getMsg(): Promise<string> {
        return 'hello';
    }

}