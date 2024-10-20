import { PermissionEntry } from "../types";
import { Column } from "./column";
import { Guild } from "./guild";
import { User } from "./user";

export class Board{
    private boardId: string;
    private boardName: string;
    private createdByUser: User;
    private guild: Guild;
    private columns: Column[];
    private permissions: PermissionEntry[];

    constructor(boardId: string, boardName: string, createdByUser: User, guild: Guild, columns: Column[], permissions: PermissionEntry[]){
        this.boardId = boardId;
        this.boardName = boardName;
        this.createdByUser = createdByUser;
        this.guild = guild;
        this.columns = columns;
        this.permissions = permissions;
    }
}