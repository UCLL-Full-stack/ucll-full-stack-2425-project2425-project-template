import { Guild } from "./guild";

export class User{
    private userId: string;
    private username: string;
    private globalName: string;
    private userAvatar: string;
    private guilds: Guild[];

    constructor(userId: string, username: string, globalName: string, userAvatar: string, guilds: Guild[]){
        this.validate(userId, username, globalName);
        this.userId = userId;
        this.username = username;
        this.globalName = globalName;
        this.userAvatar = userAvatar;
        this.guilds = guilds;
    }

    public setUserId(userId: string): void{
        this.userId = userId;
    }

    public setUsername(username: string): void{
        this.username = username;
    }

    public setGlobalName(globalName: string): void{
        this.globalName = globalName;
    }

    public setUserAvatar(userAvatar: string): void{
        this.userAvatar = userAvatar;
    }

    public getUserAvatar(): string{
        return this.userAvatar;
    }

    public setGuilds(guilds: Guild[]): void{
        this.guilds = guilds;
    }

    public addGuild(guild: Guild): void{
        this.guilds.push(guild);
    }

    public removeGuild(guildId: string): void {
        const guildIndex = this.guilds.findIndex(guild => guild.getGuildId() === guildId);
        if (guildIndex === -1) {
            throw new Error('Guild not found');
        }
        this.guilds.splice(guildIndex, 1);
    }

    public getUserId(): string{
        return this.userId;
    }

    public getUsername(): string{
        return this.username;
    }

    public getGlobalName(): string{
        return this.globalName;
    }

    public getGuilds(): Guild[]{
        return this.guilds;
    }

    public validate( userId: String, username: String, globalName: String): void{
        if(!userId){
            throw new Error("User ID is required");
        }
        if(!username){
            throw new Error("Username is required");
        }
        if(!globalName){
            throw new Error("Global Name is required");
        }
    }

    public toJSON(){
        return {
            userId: this.userId,
            username: this.username,
            globalName: this.globalName,
            guilds: this.guilds.map(guild => guild.toJSON())
        }
    }
}