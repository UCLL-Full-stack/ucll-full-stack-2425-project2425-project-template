import { PermissionEntry } from "../types";

export class Role{
    private roleId: string;
    private roleName: string;
    private permissions: PermissionEntry[];

    constructor(roleId: string, roleName: string, permissions: PermissionEntry[]){
        this.validate(roleId, roleName);
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

    public validate(roleId: string, roleName: string): void{
        if(!roleId){
            throw new Error("Role ID is required");
        }
        if(!roleName){
            throw new Error("Role Name is required");
        }
    }
}