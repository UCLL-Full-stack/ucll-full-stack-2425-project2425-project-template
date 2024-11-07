import { Member, PermissionEntry } from '../types';
import { Board } from './board';
import { Role } from './role';
import { Guild as GuildPrisma } from '@prisma/client';

export class Guild {
  private guildId: string;
  private guildName: string;
  private settings: PermissionEntry[];
  private roles: Role[] = [];
  private members: Member[];
  private boards: Board[] = [];

  constructor(guildId: string, guildName: string, settings: PermissionEntry[], members: Member[]) {
    this.guildId = guildId;
    this.guildName = guildName;
    this.settings = settings;
    this.members = members;
  }

  static from({ guildId, guildName, settings, members }: GuildPrisma & { settings: PermissionEntry[], members: Member[] }): Guild {
    return new Guild(guildId, guildName, settings, members);
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

  setRoles(roles: Role[]): void {
    this.roles = roles;
  }

  getRoles(): Role[] {
    return this.roles;
  }

  setMembers(members: Member[]): void {
    this.members = members;
  }

  getMembers(): Member[] {
    return this.members;
  }

  setBoards(boards: Board[]): void {
    this.boards = boards;
  }

  getBoards(): Board[] {
    return this.boards;
  }
}
