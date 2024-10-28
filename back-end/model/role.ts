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

    public setRoleId(roleId: string): void{
        this.roleId = roleId;
    }

    public setRoleName(roleName: string): void{
        this.roleName = roleName;
    }

    public setPermissions(permissions: PermissionEntry[]): void{
        this.permissions = permissions;
    }

    public getRoleId(): string{
        return this.roleId;
    }

    public getRoleName(): string{
        return this.roleName;
    }

    public getPermissions(): PermissionEntry[]{
        return this.permissions;
    }
}