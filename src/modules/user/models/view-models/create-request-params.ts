import { ILoginParams } from "./login-params";

export interface IRegisterUserParams extends ILoginParams {
    name: string;
} 