import { Guild } from "./guild";

export class User{
    private userId: string;
    private username: string;
    private userTag: string;
    private guilds: Guild[];

    constructor(userId: string, username: string, userTag: string, guilds: Guild[]){
        this.userId = userId;
        this.username = username;
        this.userTag = userTag;
        this.guilds = guilds;
    }
}