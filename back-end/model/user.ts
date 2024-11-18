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
      this.validate(userId, username, globalName);
      this.userId = userId;
      this.username = username;
      this.globalName = globalName;
      this.userAvatar = userAvatar;
      this.guildIds = guildIds;
    }

    static from({ userId, username, globalName, userAvatar, guilds }: UserPrisma & {guilds: GuildPrisma[]}): User {
      const guildIds = guilds.map(guild => guild.guildId);
      return new User(userId, username, globalName, userAvatar, guildIds);
    }

    validate(userId: string, username: string, globalName: string): void {
      if(userId === undefined || userId === "") {
        throw new Error("User ID cannot be empty.");
      }
      if(username === undefined || username === "") {
        throw new Error("Username cannot be empty.");
      }
      if(globalName === undefined || globalName === "") {
        throw new Error("Global name cannot be empty.");
      }
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
  