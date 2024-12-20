import { User } from './user';
import { Guild } from './guild';
import { Column } from './column';
import { PermissionEntry } from '../types';
import { Board as BoardPrisma } from '@prisma/client';

export class Board {
    private boardId: string;
    private boardName: string;
    private createdByUser: User;
    private guild: Guild;
    private columns: Column[];
    private permissions: PermissionEntry[];

    constructor(boardId: string, boardName: string, createdByUser: User, guild: Guild, columns: Column[], permissions: PermissionEntry[]) {
        this.validate(boardId, boardName, createdByUser, guild, columns, permissions);
        this.boardId = boardId;
        this.boardName = boardName;
        this.createdByUser = createdByUser;
        this.guild = guild;
        this.columns = columns;
        this.permissions = permissions;
    }

    static from(boardPrisma: BoardPrisma & { createdByUser: User; guild: Guild; columns: Column[]; permissions: PermissionEntry[] }): Board {
        return new Board(
            boardPrisma.boardId,
            boardPrisma.boardName,
            boardPrisma.createdByUser,
            boardPrisma.guild,
            boardPrisma.columns,
            boardPrisma.permissions
        );
    }

    validate(boardId: string, boardName: string, createdByUser: User, guild: Guild, columns: Column[], permissions: PermissionEntry[]): void {
        if (!boardId) {
            throw new Error('Board ID is required');
        }
        if (!boardName) {
            throw new Error('Board Name is required');
        }
        if (!createdByUser) {
            throw new Error('Created By User is required');
        }
        if (!guild) {
            throw new Error('Guild is required');
        }
        if (!columns || columns.length === 0) {
            throw new Error('Board must have at least one column');
        }
        if (!permissions || permissions.length === 0) {
            throw new Error('Board must have permission settings');
        }
    }

    getBoardId(): string {
        return this.boardId;
    }

    getBoardName(): string {
        return this.boardName;
    }

    getCreatedByUser(): User {
        return this.createdByUser;
    }

    getGuild(): Guild {
        return this.guild;
    }

    getColumns(): Column[] {
        return this.columns;
    }

    getPermissions(): PermissionEntry[] {
        return this.permissions;
    }
}