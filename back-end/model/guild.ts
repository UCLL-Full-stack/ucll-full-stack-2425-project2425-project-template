import { PermissionEntry } from "../types";
import { Role } from "./role";

export class Guild{
    private guildId: string;
    private guildName: string;
    private permissions: PermissionEntry[];
    private settings: PermissionEntry[];
    private roles: Role[];

    constructor(guildId: string, guildName: string, permissions: PermissionEntry[], settings: PermissionEntry[], roles: Role[]){
        this.guildId = guildId;
        this.guildName = guildName;
        this.permissions = permissions;
        this.settings = settings;
        this.roles = roles;
    }
}