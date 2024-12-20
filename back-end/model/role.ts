import { DiscordPermission, Member, PermissionEntry } from "../types";
import { Guild } from "./guild";
import { Guild as GuildPrisma, Role as RolePrisma, Board as BoardPrisma, Column as ColumnPrisma, Task as TaskPrisma, User as UserPrisma } from '@prisma/client';

export class Role {
    private roleId: string;
    private roleName: string;
    private permissions: DiscordPermission[];
    private guildId: string;

    constructor(roleId: string, roleName: string, permissions: DiscordPermission[], guildId: string) {
        this.validate(roleId, roleName, permissions, guildId);
        this.roleId = roleId;
        this.roleName = roleName;
        this.permissions = permissions;
        this.guildId = guildId;
    }

    validate(roleId: string, roleName: string, permissions: DiscordPermission[], guildId: string): void {
        if (!roleId) {
            throw new Error('Role ID cannot be empty.');
        }
        if (!roleName) {
            throw new Error('Role name cannot be empty.');
        }
        if (!permissions || permissions.length === 0) {
            throw new Error('Permissions cannot be empty.');
        }
        if (!guildId) {
            throw new Error('Guild ID cannot be empty.');
        }
    }

    getRoleId(): string {
        return this.roleId;
    }

    setRoleName(roleName: string): void {
        this.roleName = roleName;
    }

    getRoleName(): string {
        return this.roleName;
    }

    setPermissions(permissions: DiscordPermission[]): void {
        this.permissions = permissions;
    }

    getPermissions(): DiscordPermission[] {
        return this.permissions;
    }

    setGuildId(guildId: string): void {
        this.guildId = guildId;
    }

    getGuildId(): string {
        return this.guildId;
    }
}
  