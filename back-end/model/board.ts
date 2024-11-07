import { PermissionEntry } from '../types';
import { Column } from './column';
import { Guild } from './guild';
import { User } from './user';
import { Board as BoardPrisma } from '@prisma/client';

export class Board {
  private boardId: string;
  private boardName: string;
  private createdByUser: User;
  private guild: Guild;
  private columns: Column[] = [];
  private permissions: PermissionEntry[];

  constructor(boardId: string, boardName: string, createdByUser: User, guild: Guild, permissions: PermissionEntry[]) {
    this.boardId = boardId;
    this.boardName = boardName;
    this.createdByUser = createdByUser;
    this.guild = guild;
    this.permissions = permissions;
  }

  static from({ boardId, boardName, createdByUser, guild, permissions }: BoardPrisma & { createdByUser: User, guild: Guild, permissions: PermissionEntry[] }): Board {
    return new Board(boardId, boardName, User.from(createdByUser), Guild.from(guild), permissions);
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

  setCreatedByUser(user: User): void {
    this.createdByUser = user;
  }

  getCreatedByUser(): User {
    return this.createdByUser;
  }

  setGuild(guild: Guild): void {
    this.guild = guild;
  }

  getGuild(): Guild {
    return this.guild;
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
