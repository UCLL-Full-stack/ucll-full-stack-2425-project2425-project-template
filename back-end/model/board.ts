import { PermissionEntry } from '../types';
import { Column } from './column';
import { Guild } from './guild';
import { User } from './user';
import { Board as BoardPrisma, User as UserPrisma, Guild as GuildPrisma } from '@prisma/client';

export class Board {
  private boardId: string;
  private boardName: string;
  private createdByUserId: string;
  private guildId: string;
  private columns: Column[] = [];
  private permissions: PermissionEntry[];

  constructor(boardId: string, boardName: string, createdByUserId: string, guildId: string, permissions: PermissionEntry[]) {
    this.boardId = boardId;
    this.boardName = boardName;
    this.createdByUserId = createdByUserId;
    this.guildId = guildId;
    this.permissions = permissions;
  }

  static from({ boardId, boardName, createdByUserId, guildId, permissions }: BoardPrisma & { permissions: PermissionEntry[] }): Board {
    return new Board(boardId, boardName, createdByUserId, guildId, permissions);
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

  setColumns(columns: Column[]): void {
    this.columns = columns;
  }

  getColumns(): Column[] {
    return this.columns;
  }

  setPermissions(permissions: PermissionEntry[]): void {
    this.permissions = permissions;
  }

  getPermissions(): PermissionEntry[] {
    return this.permissions;
  }
}
