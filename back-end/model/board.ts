import { PermissionEntry, KanbanPermission } from "../types";
import { Column } from "./column";
import { Guild } from "./guild";
import { User } from "./user";

export class Board {
    private boardId: string;
    private boardName: string;
    private createdByUser: User;
    private guild: Guild;
    private columns: Column[];
    private permissions: PermissionEntry[];

    constructor(
        boardId: string, 
        boardName: string, 
        createdByUser: User, 
        guild: Guild, 
        columns: Column[], 
        permissions: PermissionEntry[]
    ) {
        this.validateConstructorParams(boardId, boardName, createdByUser, guild, columns, permissions);
        this.boardId = boardId;
        this.boardName = boardName;
        this.createdByUser = createdByUser;
        this.guild = guild;
        this.columns = columns;
        this.permissions = permissions;
    }

    private validateConstructorParams(
        boardId: string,
        boardName: string,
        createdByUser: User,
        guild: Guild,
        columns: Column[],
        permissions: PermissionEntry[]
    ): void {
        // Basic validation
        if (!boardId?.trim()) {
            throw new Error("Board ID is required");
        }
        if (!boardName?.trim()) {
            throw new Error("Board Name is required");
        }
        if (boardName.length < 3) {
            throw new Error("Board Name must be at least 3 characters long");
        }
        if (boardName.length > 50) {
            throw new Error("Board Name must be less than 50 characters");
        }

        // Entity validation
        if (!createdByUser) {
            throw new Error("Board must have a creator");
        }
        if (!guild) {
            throw new Error("Board must be associated with a guild");
        }

        // Columns validation
        if (!columns || columns.length === 0) {
            throw new Error("Board must have at least one column");
        }
        if (columns.length > 10) {
            throw new Error("Board cannot have more than 10 columns");
        }

        // Permissions validation
        if (!permissions || permissions.length === 0) {
            throw new Error("Board must have permission settings");
        }
    }


    // Getters
    public getBoardId(): string {
        return this.boardId;
    }

    public getBoardName(): string {
        return this.boardName;
    }

    public getCreatedByUser(): User {
        return this.createdByUser;
    }

    public getGuild(): Guild {
        return this.guild;
    }

    public getColumns(): Column[] {
        return [...this.columns]; 
    }

    public getPermissions(): PermissionEntry[] {
        return [...this.permissions]; // Return a copy to maintain immutability
    }

    // Setters
    public setBoardName(boardName: string): void {
        if (!boardName?.trim() || boardName.length < 3 || boardName.length > 50) {
            throw new Error("Invalid board name");
        }
        this.boardName = boardName;
    }

    // Column operations
    public addColumn(column: Column): void {
        if (this.columns.length >= 10) {
            throw new Error("Cannot add more than 10 columns");
        }
        this.columns.push(column);
    }

    public removeColumn(columnId: string): void {
        const columnIndex = this.columns.findIndex(col => col.getColumnId() === columnId);
        if (columnIndex === -1) {
            throw new Error("Column not found");
        }
        if (this.columns.length <= 1) {
            throw new Error("Cannot remove the last column");
        }
        this.columns = this.columns.filter(column => column.getColumnId() !== columnId);
    }

    public setPermissions(permissions: PermissionEntry[]): void {
        this.permissions = permissions;
    }

    public toJSON() {
        return {
            boardId: this.boardId,
            boardName: this.boardName,
            createdByUser: this.createdByUser.getUserId(),
            guild: this.guild.getGuildId(),
            columns: this.columns.map(column => column.getColumnName()),
            permissions: this.permissions
        };
    }

}