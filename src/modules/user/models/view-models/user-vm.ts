import UserRoles from "../role.enum";
import { BaseModelVm } from "../../../shared/base.model";

export interface UserVm extends BaseModelVm {
    name: string;
    roles: UserRoles;
    email: string;
}