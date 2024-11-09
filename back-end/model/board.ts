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
    this.boardId = boardId;
    this.boardName = boardName;
    this.createdByUserId = createdByUserId;
    this.columnIds = columnIds;
    this.guildId = guildId;
    this.permissions = permissions;
  }

  static from({ boardId, boardName, createdByUserId, columnIds, guildId, permissions }: BoardPrisma & { permissions: PermissionEntry[]}): Board {
      return new Board(
          boardId,
          boardName,
          createdByUserId,
          columnIds,
          guildId,
          permissions
      );
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

  setCreatedByUser(user: string): void {
    this.createdByUserId = user;
  }

  getCreatedByUser(): string {
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
