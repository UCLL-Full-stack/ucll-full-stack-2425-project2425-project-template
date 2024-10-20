import { PermissionEntry } from "../types";

export class Role{
    private roleId: string;
    private roleName: string;
    private permissions: PermissionEntry[];

    constructor(roleId: string, roleName: string, permissions: PermissionEntry[]){
        this.roleId = roleId;
        this.roleName = roleName;
        this.permissions = permissions;
    }
}