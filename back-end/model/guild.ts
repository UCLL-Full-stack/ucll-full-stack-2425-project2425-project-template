import { PermissionEntry } from "../types";
import { Role } from "./role";

export class Guild{
    private guildId: string;
    private guildName: string;
    private permissions: PermissionEntry[];
    private settings: PermissionEntry[];
    private roles: Role[];

    constructor(guildId: string, guildName: string, permissions: PermissionEntry[], settings: PermissionEntry[], roles: Role[]){
        this.validate(guildId, guildName);
        this.guildId = guildId;
        this.guildName = guildName;
        this.permissions = permissions;
        this.settings = settings;
        this.roles = roles;
    }

    public setGuildId(guildId: string): void{
        this.guildId = guildId;
    }

    public setGuildName(guildName: string): void{
        this.guildName = guildName;
    }

    public setPermissions(permissions: PermissionEntry[]): void{
        this.permissions = permissions;
    }

    public setSettings(settings: PermissionEntry[]): void{
        this.settings = settings;
    }

    public setRoles(roles: Role[]): void{
        this.roles = roles;
    }

    public addRole(role: Role): void{
        this.roles.push(role);
    }

    public removeRole(roleId: string): void{
        this.roles = this.roles.filter(role => role.getRoleId() !== roleId);
    }

    public getGuildId(): string{
        return this.guildId;
    }

    public getGuildName(): string{
        return this.guildName;
    }

    public getPermissions(): PermissionEntry[]{
        return this.permissions;
    }

    public getSettings(): PermissionEntry[]{
        return this.settings;
    }

    public getRoles(): Role[]{
        return this.roles;
    }

    public validate(guildId: string, guildName: string): void{
        if(!guildId){
            throw new Error("Guild ID is required");
        }
        if(!guildName){
            throw new Error("Guild Name is required");
        }
    }
}