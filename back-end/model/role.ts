import { DiscordPermission } from "../types";
import { Guild } from "./guild";
import { Role as RolePrisma } from "@prisma/client";

export class Role {
    private roleId: string;
    private roleName: string;
    private permissions: DiscordPermission[];
    private guild: Guild;
  
    constructor(roleId: string, roleName: string, permissions: DiscordPermission[], guild: Guild) {
      this.roleId = roleId;
      this.roleName = roleName;
      this.permissions = permissions;
      this.guild = guild;
    }

    static from({ roleId, roleName, permissions, guild }: RolePrisma & { guild: Guild }): Role {
        return new Role(roleId, roleName, permissions ? permissions as DiscordPermission[] : [], guild);
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
  
    setGuild(guild: Guild): void {
      this.guild = guild;
    }
  
    getGuild(): Guild {
      return this.guild;
    }
  }
  