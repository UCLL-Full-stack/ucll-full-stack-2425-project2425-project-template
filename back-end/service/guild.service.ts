import { Guild } from "../model/guild";
import { Role } from "../model/role";
import { User } from "../model/user";
import guildDb from "../repository/guild.db";
import roleDb from "../repository/role.db";
import userDb from "../repository/user.db";
import { CreateGuildInput, DiscordPermission, KanbanPermission, Member, PermissionEntry, UpdateGuildInput } from "../types";


const getAllGuilds = async (): Promise<Guild[]> => {
    return await guildDb.getAllGuilds();
}

const getGuildById = async (guildId: string): Promise<Guild> => {
    return await guildDb.getGuildById(guildId);
}

const addGuild = async (guildData: CreateGuildInput): Promise<Guild> => {
    const { guildId, guildName, guildOwnerId, settings = [], roleIds = [], members = [], userIds = [], boardIds = [] } = guildData;
    let updatedSettings = settings;

    if (settings.length === 0) {
        updatedSettings = [
            { identifier: DiscordPermission.ADMINISTRATOR, kanbanPermission: [KanbanPermission.ADMINISTRATOR] },
        ];
    } else {
        const adminPermission = settings.find(permission => permission.identifier === DiscordPermission.ADMINISTRATOR);
        if (!adminPermission) {
            updatedSettings = [
                ...settings,
                { identifier: DiscordPermission.ADMINISTRATOR, kanbanPermission: [KanbanPermission.ADMINISTRATOR] },
            ];
        }
    }
    const updatedGuildData = {
        ...guildData,
        settings: updatedSettings,
    };
    return await guildDb.addGuild(updatedGuildData);
}

const updateGuild = async (guildId: string, guildData: UpdateGuildInput): Promise<Guild> => {
    const guild = await guildDb.getGuildById(guildId);
    if( !guild ) {
        throw new Error("Guild not found");
    }
    return await guildDb.updateGuild(guildId, guildData);
}

const getGuildPermissions = async (guildId: string): Promise<PermissionEntry[]> => {
    const guild = await guildDb.getGuildById(guildId);
    if( !guild ) {
        throw new Error("Guild not found");
    }
    return guild.getSettings();
}

const getGuildMembers = async (guildId: string): Promise<User[]> => {
    const guild = await guildDb.getGuildById(guildId);
    if (!guild) {
        throw new Error("Guild not found");
    }
    const members = guild.getMembers();
    const memberUserIds = members.map((member: Member) => member.userId);
    const users = await Promise.all(
        memberUserIds.map(async (userId) => {
            try {
                return await userDb.getUserById(userId);
            } catch (error) {
                if (error instanceof Error && error.message === "User not found") {
                    return null;
                }
                throw error;
            }
        })
    );
    return users.filter((user): user is User => user !== null);
};

const getGuildRoles = async (guildId: string): Promise<Role[]> => {
    const guild = await guildDb.getGuildById(guildId);
    if (!guild) {
        throw new Error("Guild not found");
    }
    const roleIds = guild.getRoleIds();
    const roles =  await Promise.all(
        roleIds.map(async (roleId) => {
            try {
                return await roleDb.getRoleById(roleId);
            } catch (error) {
                if (error instanceof Error && error.message === "Role not found") {
                    return null;
                }
                throw error;
            }
        })
    );
    return roles.filter((role): role is Role => role !== null);
}

export default {
    getAllGuilds,
    getGuildById,
    addGuild,
    updateGuild,
    getGuildPermissions,
    getGuildMembers,
    getGuildRoles,
}