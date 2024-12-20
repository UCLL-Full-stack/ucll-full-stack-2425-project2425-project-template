import { Member, PermissionEntry } from '../types';
import { Board } from './board';
import { Role } from './role';
import { Guild as GuildPrisma, Role as RolePrisma, Board as BoardPrisma, Column as ColumnPrisma, Task as TaskPrisma, User as UserPrisma } from '@prisma/client';

export class Guild {
  private guildId: string;
  private guildName: string;
  private guildOwnerId: string | null;
  private settings: PermissionEntry[];
  private roleIds: string[];
  private members: Member[];
  private boardIds: string[];

  constructor(guildId: string, guildName: string, guildOwnerId: string | null, settings: PermissionEntry[], roleIds: string[], members: Member[], boardIds: string[]) {
    this.validate(guildName, settings, members);
    this.guildId = guildId;
    this.guildName = guildName;
    this.guildOwnerId = guildOwnerId;
    this.settings = settings;
    this.roleIds = roleIds;
    this.members = members;
    this.boardIds = boardIds;
  }

  static from({ guildId, guildName, guildOwnerId, settings, roles, members, boards }: GuildPrisma & { roles: {roleId: string}[], boards: {boardId: string}[]}): Guild {
    const typedSettings = JSON.parse(settings as unknown as string) as PermissionEntry[];
    const typedMembers = JSON.parse(members as unknown as string) as Member[];
    const roleIds = roles.map(role => role.roleId);
    const boardIds = boards.map(board => board.boardId);
    return new Guild(guildId, guildName, guildOwnerId, typedSettings, roleIds, typedMembers, boardIds);
  }

  validate(guildName: string, settings: PermissionEntry[], members: Member[]): void {
    if(guildName === undefined || guildName === "") {
      throw new Error("Guild name cannot be empty.");
    }
    if(settings === undefined || settings.length === 0) {
      throw new Error("Settings cannot be empty.");
    }
    if(members === undefined || members.length === 0) {
      throw new Error("Members cannot be empty.");
    }
  }

  getGuildId(): string {
    return this.guildId;
  }

  setGuildOwnerId(guildOwnerId: string | null): void {
    this.guildOwnerId = guildOwnerId;
  }

  getGuildOwnerId(): string | null {
    return this.guildOwnerId;
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
