import { Member, PermissionEntry } from '../types';
import { Board } from './board';
import { Role } from './role';
import { Guild as GuildPrisma, Role as RolePrisma, Board as BoardPrisma, Column as ColumnPrisma, Task as TaskPrisma, User as UserPrisma } from '@prisma/client';

export class Guild {
  private guildId: string;
  private guildName: string;
  private settings: PermissionEntry[];
  private roleIds: string[];
  private members: Member[];
  private boardIds: string[];

  constructor(guildId: string, guildName: string, settings: PermissionEntry[], roleIds: string[], members: Member[], boardIds: string[]) {
    this.guildId = guildId;
    this.guildName = guildName;
    this.settings = settings;
    this.roleIds = roleIds;
    this.members = members;
    this.boardIds = boardIds;
  }

  static from({ guildId, guildName, settings, roleIds, members, boardIds }: GuildPrisma): Guild {
    const typedSettings = settings as unknown as PermissionEntry[];
    const typedMembers = members as unknown as Member[];
    return new Guild(guildId, guildName, typedSettings, roleIds, typedMembers, boardIds);
  }

  getGuildId(): string {
    return this.guildId;
  }

  setGuildName(guildName: string): void {
    this.guildName = guildName;
  }

  getGuildName(): string {
    return this.guildName;
  }

  setSettings(settings: PermissionEntry[]): void {
    this.settings = settings;
  }

  getSettings(): PermissionEntry[] {
    return this.settings;
  }

  setRoleIds(roles: string[]): void {
    this.roleIds = roles;
  }

  getRoleIds(): string[] {
    return this.roleIds;
  }

  setMembers(members: Member[]): void {
    this.members = members;
  }

  getMembers(): Member[] {
    return this.members;
  }

  setBoardIds(boards: string[]): void {
    this.boardIds = boards;
  }

  getBoardIds(): string[] {
    return this.boardIds;
  }
}
