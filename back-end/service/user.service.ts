import { Guild } from "../model/guild";
import { User } from "../model/user";
import guildDb from "../repository/guild.db";
import roleDb from "../repository/role.db";
import userDb from "../repository/user.db";
import { CreateUserInput, DiscordPermission, KanbanPermission, UpdateUserInput } from "../types";



const getAllUsers = async (): Promise<User[]> => {
    return await userDb.getAllUsers();
}

const getUserById = async (userId: string): Promise<User> => {
    return await userDb.getUserById(userId);
}

const addUser = async (userData: CreateUserInput): Promise<User> => {
    return await userDb.addUser(userData);
}

const updateUser = async (userId: string, userData: UpdateUserInput): Promise<User> => {
    return await userDb.updateUser(userId, userData);
}

const getUserGuilds = async (userId: string): Promise<Guild[]> => {
    const user = await userDb.getUserById(userId);
    const guildIds = user.getGuildIds();
    return await Promise.all(guildIds.map(guildId => guildDb.getGuildById(guildId)));
}

const canUserAccessGuild = async (userId: string, guildId: string): Promise<boolean> => {
    const user = await userDb.getUserById(userId);
    return user.getGuildIds().includes(guildId);
}

const getAllKanbanPermissionsForGuild = async (userId: string, guildId: string): Promise<KanbanPermission[]> => {
    const guild = await guildDb.getGuildById(guildId);
    const permissions = guild.getSettings();
    const userRoles = guild.getMembers().find(member => member.userId === userId)?.roleIds || [];
    const roles = await Promise.all(userRoles.map(async (roleId) => await roleDb.getRoleById(roleId)));
    const rolePermissions = roles.map(role => role.getPermissions());
    const allDiscordPermissions = rolePermissions.reduce((acc, val) => acc.concat(val), []);
    let kanbanPermissions: KanbanPermission[] = [];
    for (const permission of permissions) {
        if (permission.identifier === userId) {
            kanbanPermissions = kanbanPermissions.concat(permission.kanbanPermission);
        }
        for (const role of userRoles) {
            if (permission.identifier === role) {
                kanbanPermissions = kanbanPermissions.concat(permission.kanbanPermission);
            }
        }
        for (const discordPermission of allDiscordPermissions) {
            if (permission.identifier === discordPermission) {
                kanbanPermissions = kanbanPermissions.concat(permission.kanbanPermission);
            }
        }
    }
    return kanbanPermissions;
};

export default {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    getUserGuilds,
    canUserAccessGuild,
    getAllKanbanPermissionsForGuild
}