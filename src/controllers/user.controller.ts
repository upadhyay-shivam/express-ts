import { Controller, Route, Get, Security, Post, Body } from 'tsoa';
import { Inject } from "typescript-ioc";
import { UserService } from "../modules/user/UserService";
import { IRegisterUserParams } from '../modules/user/models/view-models/create-request-params';
import { ILoginParams } from '../modules/user/models/view-models/login-params';


@Route('/users')
export class UserController extends Controller {
    @Inject private readonly $userService: UserService
    @Get()
    @Security('Bearer')
    public async getAll(): Promise<any> {
        try {
            return await this.$userService.getMsg();
        } catch (e) {
            throw e;
        }
    }
    @Post()
    @Security('Bearer')
    public async createUser(@Body() createUserParams: IRegisterUserParams): Promise<any> {
        try {
            return await this.$userService.createUser(createUserParams);
        } catch (e) {
            throw e;
        }
    }
    @Post('/login')
    public async loginUser(@Body() loginParams: ILoginParams): Promise<any> {
        try {
            return await this.$userService.login(loginParams);
        } catch (e) {
            throw e;
        }
    }

}
