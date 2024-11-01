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
        this.validatePermissions(permissions);
    }

    private validatePermissions(permissions: PermissionEntry[]): void {
        // Check for required permissions
        const hasAdminPermission = permissions.some(
            perm => perm.kanbanPermission === KanbanPermission.ADMINISTRATOR
        );
        const hasViewPermission = permissions.some(
            perm => perm.kanbanPermission === KanbanPermission.VIEW_BOARD
        );

        if (!hasAdminPermission) {
            throw new Error("Board must have at least one administrator");
        }
        if (!hasViewPermission) {
            throw new Error("Board must have view permission set");
        }

        // Validate permission structure
        permissions.forEach(perm => {
            if (!perm.identifier) {
                throw new Error("Permission must have an identifier");
            }
            if (!Object.values(KanbanPermission).includes(perm.kanbanPermission)) {
                throw new Error(`Invalid permission type: ${perm.kanbanPermission}`);
            }
        });
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

    // Permission operations
    public addPermission(permission: PermissionEntry): void {
        // Validate new permission
        if (!permission.identifier || !Object.values(KanbanPermission).includes(permission.kanbanPermission)) {
            throw new Error("Invalid permission");
        }
        this.permissions.push(permission);
    }

    public removePermission(identifier: string, permission: KanbanPermission): void {
        const isAdmin = permission === KanbanPermission.ADMINISTRATOR;
        const remainingAdmins = this.permissions.filter(
            p => p.kanbanPermission === KanbanPermission.ADMINISTRATOR && 
                 p.identifier !== identifier
        ).length;

        if (isAdmin && remainingAdmins === 0) {
            throw new Error("Cannot remove the last administrator");
        }

        this.permissions = this.permissions.filter(
            p => !(p.identifier === identifier && p.kanbanPermission === permission)
        );
    }
}