import { Guild } from '../model/guild';
import { Role } from '../model/role';
import { PermissionEntry, KanbanPermission, DiscordPermission, Member } from '../types';
import database from './database';
import  roleDb  from './role.db';

const getAllGuilds = async(): Promise<Guild[]> => {
    try {
        const guildsPrisma = await database.guild.findMany({
            include: {
                roles: {
                    select: { roleId: true },
                },
                boards: {
                    select: { boardId: true },
                },
            },
        });

        return guildsPrisma.map((guildPrisma) => {
            const roleIds = guildPrisma.roles?.map(role => role.roleId) || [];
            const boardIds = guildPrisma.boards?.map(board => board.boardId) || [];
            const guild = Guild.from(guildPrisma);
            guild.setRoleIds(roleIds);
            guild.setBoardIds(boardIds);
            return guild;
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getGuildById = async (guildId: string): Promise<Guild> => {
    const guildPrisma = await database.guild.findUnique({
      where: { guildId },
      include: {
        roles: {
          select: { roleId: true },
        },
        boards: {
          select: { boardId: true },
        },
      },
    });
  
    if (!guildPrisma) {
      throw new Error("Guild not found");
    }
    const roleIds = guildPrisma.roles?.map((role) => role.roleId) || [];
    const boardIds = guildPrisma.boards?.map((board) => board.boardId) || [];
    const guild = Guild.from(guildPrisma);
    guild.setRoleIds(roleIds);
    guild.setBoardIds(boardIds);
    return guild;
};

const addGuild = async (guildData: {
    guildId: string;
    guildName: string;
    settings?: PermissionEntry[];
    roleIds?: string[];
    members?: Member[];
    userIds?: string[];
    boardIds?: string[];
  }): Promise<Guild> => {
    try {
        const {
            guildId,
            guildName,
            settings = [],
            roleIds = [],
            members = [],
            userIds = [],
            boardIds = [],
        } = guildData;

        const settingsJson = JSON.stringify(settings);
        const membersJson = JSON.stringify(members);
    
        const newGuildPrisma = (await database.guild.create({
            data: {
            guildId,
            guildName,
            settings: settingsJson,
            roleIds,
            roles: {
                connect: roleIds.map((roleId) => ({ roleId })),
            },
            members: membersJson,
            userIds,
            users: {
                connect: userIds.map((userId) => ({ userId })),
            },
            boardIds,
            boards: {
                connect: boardIds.map((boardId) => ({ boardId })),
            },
            },
            include: {
                roles: {
                    select: { roleId: true },
                },
                boards: {
                    select: { boardId: true },
                },
            },
        }));
    
        const roleIdsResult = newGuildPrisma.roles?.map((role) => role.roleId) || [];
        const boardIdsResult = newGuildPrisma.boards?.map((board) => board.boardId) || [];
    
        const newGuild = Guild.from(newGuildPrisma);
        newGuild.setRoleIds(roleIdsResult);
        newGuild.setBoardIds(boardIdsResult);
    
        return newGuild;
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
};
  
const updateGuild = async (guildId: string, updateData: {
    guildName?: string;
    settings?: PermissionEntry[];
    roleIds?: string[];
    members?: Member[];
    userIds?: string[];
    boardIds?: string[];
}): Promise<Guild> => {
    try {
        const { guildName, settings, roleIds, members, userIds, boardIds } = updateData;
        const data: any = {};
        if (guildName !== undefined) data.guildName = guildName;
        if (settings !== undefined) data.settings = JSON.stringify(settings);
        if (roleIds !== undefined) {
            data.roles = {
                set: roleIds.map((roleId) => ({ roleId })),
            };
            data.roleIds = roleIds;
        }
        if (members !== undefined) {
            data.members = JSON.stringify(members);
        }
        if (userIds !== undefined) {
            data.users = {
                set: userIds.map((userId) => ({ userId })),
            };
            data.userIds = userIds;
        }
        if (boardIds !== undefined) {
            data.boards = {
                set: boardIds.map((boardId) => ({ boardId })),
            };
            data.boardIds = boardIds;
        }

        const updatedGuildPrisma = await database.guild.update({
            where: { guildId },
            data,
            include: {
                roles: {
                    select: { roleId: true },
                },
                boards: {
                    select: { boardId: true },
                },
            },
        });

        const roleIdsResult = updatedGuildPrisma.roles?.map((role) => role.roleId) || [];
        const boardIdsResult = updatedGuildPrisma.boards?.map((board) => board.boardId) || [];

        const updatedGuild = Guild.from(updatedGuildPrisma);
        updatedGuild.setRoleIds(roleIdsResult);
        updatedGuild.setBoardIds(boardIdsResult);
        return updatedGuild;
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
};


export default {
    getAllGuilds,
    getGuildById,
    addGuild,
    updateGuild,
};
