import { Guild } from '../model/guild';
import { Role } from '../model/role';
import { PermissionEntry, KanbanPermission, DiscordPermission, Member } from '../types';
import database from './database';
import  roleDb  from './role.db';

const getAllGuilds = async(): Promise<Guild[]> => {
    try {
        const guildsPrisma = await database.guild.findMany({
            include: {
                guildOwner: true,
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
            guild.setGuildOwnerId(guildPrisma.guildOwnerId);
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
        guildOwner: true,
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
    guild.setGuildOwnerId(guildPrisma.guildOwnerId);
    return guild;
};

const addGuild = async (guildData: {
    guildId: string;
    guildName: string;
    guildOwnerId: string;
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
            guildOwnerId,
            settings = [],
            roleIds = [],
            members = [],
            userIds = [],
            boardIds = [],
        } = guildData;
        // console.log('guildData:', guildData);
        const settingsJson = JSON.stringify(settings);
        const membersJson = JSON.stringify(members);
    
        const newGuildPrisma = (await database.guild.create({
            data: {
            guildId,
            guildName,
            guildOwner: {
                connect: { userId: guildOwnerId },
            },
            settings: settingsJson,
            roles: {
                connect: roleIds.map((roleId) => ({ roleId })),
            },
            members: membersJson,
            users: {
                connect: userIds.map((userId) => ({ userId })),
            },
            boards: {
                connect: boardIds.map((boardId) => ({ boardId })),
            },
            },
            include: {
                guildOwner: true,
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
    guildOwnerId?: string;
    settings?: PermissionEntry[];
    roleIds?: string[];
    members?: Member[];
    userIds?: string[];
    boardIds?: string[];
}): Promise<Guild> => {
    try {
        const { guildName, guildOwnerId, settings, roleIds, members, userIds, boardIds } = updateData;
        const data: any = {};
        if (guildName !== undefined) data.guildName = guildName;
        if (guildOwnerId !== undefined) data.guildOwner = { connect: { userId: guildOwnerId } };
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
                guildOwner: true,
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
        updatedGuild.setGuildOwnerId(updatedGuildPrisma.guildOwnerId);
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
