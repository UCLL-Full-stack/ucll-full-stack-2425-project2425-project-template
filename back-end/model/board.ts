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

    public setBoardId(boardId: string): void{
        this.boardId = boardId;
    }

    public setBoardName(boardName: string): void{
        this.boardName = boardName;
    }

    public setCreatedByUser(createdByUser: User): void{
        this.createdByUser = createdByUser;
    }

    public setGuild(guild: Guild): void{
        this.guild = guild;
    }

    public setColumns(columns: Column[]): void{
        this.columns = columns;
    }

    public setPermissions(permissions: PermissionEntry[]): void{
        this.permissions = permissions;
    }

    public addColumn(column: Column): void{
        this.columns.push(column);
    }

    public removeColumn(columnId: string): void{
        this.columns = this.columns.filter(column => column.getColumnId() !== columnId);
    }

    public getBoardId(): string{
        return this.boardId;
    }

    public getBoardName(): string{
        return this.boardName;
    }

    public getCreatedByUser(): User{
        return this.createdByUser;
    }

    public getGuild(): Guild{
        return this.guild;
    }

    public getColumns(): Column[]{
        return this.columns;
    }

    public getPermissions(): PermissionEntry[]{
        return this.permissions;
    }

    public addPermission(permission: PermissionEntry): void{
        this.permissions.push(permission);
    }
    
}