import { Member, PermissionEntry } from "../types";
import { Guild } from "./guild";
import { Guild as GuildPrisma, Role as RolePrisma, Board as BoardPrisma, Column as ColumnPrisma, Task as TaskPrisma, User as UserPrisma } from '@prisma/client';

export class User {
    private userId: string;
    private username: string;
    private globalName: string;
    private userAvatar: string;
    private guildIds: string[];
  
    constructor(userId: string, username: string, globalName: string, userAvatar: string, guildIds: string[]) {
      this.userId = userId;
      this.username = username;
      this.globalName = globalName;
      this.userAvatar = userAvatar;
      this.guildIds = guildIds;
    }

    static from({ userId, username, globalName, userAvatar, guildIds }: UserPrisma): User {
      return new User(userId, username, globalName, userAvatar, guildIds);
    }
  
    getUserId(): string {
      return this.userId;
    }
  
    setUsername(username: string): void {
      this.username = username;
    }
  
    getUsername(): string {
      return this.username;
    }
  
    setGlobalName(globalName: string): void {
      this.globalName = globalName;
    }
  
    getGlobalName(): string {
      return this.globalName;
    }
  
    setUserAvatar(userAvatar: string): void {
      this.userAvatar = userAvatar;
    }
  
    getUserAvatar(): string {
      return this.userAvatar;
    }
  
    setGuildIds(guildIds: string[]): void {
      this.guildIds = guildIds;
    }
  
    getGuildIds(): string[] {
      return this.guildIds;
    }
  }
  