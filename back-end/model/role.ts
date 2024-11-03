import { DiscordPermission } from "../types";

export class Role{
    private roleId: string;
    private roleName: string;
    private permissions: DiscordPermission[];

    constructor(roleId: string, roleName: string, permissions: DiscordPermission[]){
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

    public setPermissions(permissions: DiscordPermission[]): void{
        this.permissions = permissions;
    }

    public getRoleId(): string{
        return this.roleId;
    }

    public getRoleName(): string{
        return this.roleName;
    }

    public getPermissions(): DiscordPermission[]{
        return this.permissions;
    }

    public addPermission(permission: DiscordPermission): void {
        if (!this.permissions.includes(permission)) {
            this.permissions.push(permission);
        } else {
            throw new Error(`Permission ${permission} already exists for this role.`);
        }
    }

    public removePermission(permission: DiscordPermission): void {
        const index = this.permissions.indexOf(permission);
        if (index !== -1) {
            this.permissions.splice(index, 1);
        } else {
            throw new Error(`Permission ${permission} does not exist for this role.`);
        }
    }

    public hasPermission(permission: DiscordPermission): boolean {
        return this.permissions.includes(permission);
    }

    public validate(roleId: string, roleName: string): void{
        if(!roleId){
            throw new Error("Role ID is required");
        }
        if(!roleName){
            throw new Error("Role Name is required");
        }
    }

    public toJSON(){
        return {
            roleId: this.roleId,
            roleName: this.roleName,
            permissions: this.permissions
        }
    }
}