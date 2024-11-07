import { Guild } from "./guild";
import { User as UserPrisma } from "@prisma/client";

export class User {
    private userId: string;
    private username: string;
    private globalName: string;
    private userAvatar: string;
    private guilds: Guild[] = [];
  
    constructor(userId: string, username: string, globalName: string, userAvatar: string) {
      this.userId = userId;
      this.username = username;
      this.globalName = globalName;
      this.userAvatar = userAvatar;
    }

    static from({ userId, username, globalName, userAvatar }: UserPrisma): User {
        return new User(userId, username, globalName, userAvatar);
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
  
    setGuilds(guilds: Guild[]): void {
      this.guilds = guilds;
    }
  
    getGuilds(): Guild[] {
      return this.guilds;
    }
  }
  