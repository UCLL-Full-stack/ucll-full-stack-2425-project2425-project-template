import { DiscordPermission, Member, PermissionEntry } from "../types";
import { Guild } from "./guild";
import { Guild as GuildPrisma, Role as RolePrisma, Board as BoardPrisma, Column as ColumnPrisma, Task as TaskPrisma, User as UserPrisma } from '@prisma/client';

export class Role {
    private roleId: string;
    private roleName: string;
    private permissions: DiscordPermission[];
    private guildId: string;
  
    constructor(roleId: string, roleName: string, permissions: DiscordPermission[], guild: string) {
      this.roleId = roleId;
      this.roleName = roleName;
      this.permissions = permissions;
      this.guildId = guild;
    }

    static from({ roleId, roleName, permissions, guildId }: RolePrisma): Role {
        let permissionsArray = JSON.parse(permissions as string) as DiscordPermission[];
        return new Role(roleId, roleName, permissionsArray, guildId);
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
  