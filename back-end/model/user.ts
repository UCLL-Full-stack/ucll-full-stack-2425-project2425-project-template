import { Guild } from "./guild";

export class User{
    private userId: string;
    private username: string;
    private userTag: string;
    private guilds: Guild[];

    constructor(userId: string, username: string, userTag: string, guilds: Guild[]){
        this.validate(userId, username, userTag);
        this.userId = userId;
        this.username = username;
        this.userTag = userTag;
        this.guilds = guilds;
    }

    public setUserId(userId: string): void{
        this.userId = userId;
    }

    public setUsername(username: string): void{
        this.username = username;
    }

    public setUserTag(userTag: string): void{
        this.userTag = userTag;
    }

    public setGuilds(guilds: Guild[]): void{
        this.guilds = guilds;
    }

    public addGuild(guild: Guild): void{
        this.guilds.push(guild);
    }

    public removeGuild(guildId: string): void{
        this.guilds = this.guilds.filter(guild => guild.getGuildId() !== guildId);
    }

    public getUserId(): string{
        return this.userId;
    }

    public getUsername(): string{
        return this.username;
    }

    public getUserTag(): string{
        return this.userTag;
    }

    public getGuilds(): Guild[]{
        return this.guilds;
    }

    public validate( userId: String, username: String, userTag: String): void{
        if(!userId){
            throw new Error("User ID is required");
        }
        if(!username){
            throw new Error("Username is required");
        }
        if(!userTag){
            throw new Error("User Tag is required");
        }
    }

    public toJSON(){
        return {
            userId: this.userId,
            username: this.username,
            userTag: this.userTag,
            guilds: this.guilds.map(guild => guild.getGuildId())
        }
    }
}