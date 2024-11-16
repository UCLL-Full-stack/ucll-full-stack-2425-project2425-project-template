import { PermissionEntry } from '../types';
import { Column } from './column';
import { Guild } from './guild';
import { User } from './user';
import { Guild as GuildPrisma, Role as RolePrisma, Board as BoardPrisma, Column as ColumnPrisma, Task as TaskPrisma, User as UserPrisma } from '@prisma/client';

export class Board {
  private boardId: string;
  private boardName: string;
  private createdByUserId: string;
  private guildId: string;
  private columnIds: string[];
  private permissions: PermissionEntry[];

  constructor(boardId: string, boardName: string, createdByUserId: string, columnIds: string[], guildId: string, permissions: PermissionEntry[]) {
    this.validate(boardName, createdByUserId, columnIds, guildId, permissions);
    this.boardId = boardId;
    this.boardName = boardName;
    this.createdByUserId = createdByUserId;
    this.columnIds = columnIds;
    this.guildId = guildId;
    this.permissions = permissions;
  }

  static from({ boardId, boardName, createdByUserId, columnIds, guildId, permissions }: BoardPrisma): Board {
    const typedPermissions = JSON.parse(permissions as unknown as string) as PermissionEntry[];
      return new Board(
          boardId,
          boardName,
          createdByUserId,
          columnIds,
          guildId,
          typedPermissions
      );
  }

  validate(boardName: string, createdByUserId: string, columnIds: string[], guildId: string, permissions: PermissionEntry[]): void {
    if(boardName === undefined || boardName === "") {
      throw new Error("Board name cannot be empty.");
    }
    if(createdByUserId === undefined || createdByUserId === "") {
      throw new Error("Created by user ID cannot be empty.");
    }
    if(columnIds === undefined || columnIds.length === 0) {
      throw new Error("Column IDs cannot be empty.");
    }
    if(guildId === undefined || guildId === "") {
      throw new Error("Guild ID cannot be empty.");
    }
    if(permissions === undefined || permissions.length === 0) {
      throw new Error("Permissions cannot be empty.");
    }
  }

  getBoardId(): string {
    return this.boardId;
  }

  setBoardName(boardName: string): void {
    this.boardName = boardName;
  }

  getBoardName(): string {
    return this.boardName;
  }

  setCreatedByUserId(userId: string): void {
    this.createdByUserId = userId;
  }

  getCreatedByUserId(): string {
    return this.createdByUserId;
  }

  setGuildId(guildId: string): void {
    this.guildId = guildId;
  }

  getGuildId(): string {
    return this.guildId;
  }

  setColumnIds(columnIds: string[]): void {
    this.columnIds = columnIds;
  }

  getColumnIds(): string[] {
    return this.columnIds;
  }

  setPermissions(permissions: PermissionEntry[]): void {
    this.permissions = permissions;
  }

  getPermissions(): PermissionEntry[] {
    return this.permissions;
  }
}
