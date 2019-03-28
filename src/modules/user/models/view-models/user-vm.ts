import UserRoles from "../role.enum";

export interface UserVm {
    name: string;
    id: string | number;
    roles: UserRoles;
    email: string;
}