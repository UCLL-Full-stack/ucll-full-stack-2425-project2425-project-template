import { User } from "../model/user";
import { Guild } from "../model/guild";
import guildDb from "./guild.db";
import database from "./database";

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({ include: { guilds: {
            select: { guildId: true }
        }}})
        return usersPrisma.map((userPrisma) => {
            const guildIds = userPrisma.guilds?.map(guild => guild.guildId) || [];
            const user = User.from(userPrisma);
            user.setGuildIds(guildIds);
            return user;
        });
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
};

const getUserById = async (userId: string): Promise<User> => {
    const userPrisma = await database.user.findUnique({ where: { userId }, include: { guilds: {
        select: { guildId: true }
    } } });
    if(!userPrisma) {
        throw new Error("User not found");
    }
    const guildIds = userPrisma.guilds?.map(guild => guild.guildId) || [];
    const user = User.from(userPrisma);
    user.setGuildIds(guildIds);
    return user;
}

const addUser = async (userData: {
    userId: string;
    username: string;
    globalName: string;
    userAvatar: string;
    guildIds?: string[];
    boardIds?: string[];
    taskIds?: string[];
}): Promise<User> => {
    try {
        const { userId, username, globalName, userAvatar, guildIds = [], boardIds = [], taskIds = [] } = userData;

        const newUserPrisma = await database.user.create({
            data: {
                userId,
                username,
                globalName,
                userAvatar,
                guildIds,
                guilds: {
                    connect: guildIds.map(guildId => ({ guildId }))
                },
                boards: {
                    connect: boardIds.map(boardId => ({ boardId }))
                },
                tasks: {
                    connect: taskIds.map(taskId => ({ taskId }))
                }
            },
            include: {
                guilds: {
                    select: { guildId: true }
                }
            }
        })
        const guildIdsResult = newUserPrisma.guilds?.map(guild => guild.guildId) || [];
        const newUser = User.from(newUserPrisma);
        newUser.setGuildIds(guildIdsResult);
        return newUser;
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
}

const updateUser = async (userId: string, updateData: {
    username?: string;
    globalName?: string;
    userAvatar?: string;
    guildIds?: string[];
  }): Promise<User> => {
    try {
        const { username, globalName, userAvatar, guildIds } = updateData;
            const data: any = {};
        if (username !== undefined) data.username = username;
        if (globalName !== undefined) data.globalName = globalName;
        if (userAvatar !== undefined) data.userAvatar = userAvatar;
        if (guildIds !== undefined) {
            data.guilds = {
            set: guildIds.map((guildId) => ({ guildId })),
            };
        }
    
        const updatedUserPrisma = await database.user.update({
            where: { userId },
            data,
            include: {
            guilds: {
                select: { guildId: true },
            },
            },
        });
  
        const guildIdsResult = updatedUserPrisma.guilds?.map((guild) => guild.guildId) || [];
        const updatedUser = User.from(updatedUserPrisma);
        updatedUser.setGuildIds(guildIdsResult);
  
        return updatedUser;
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
};
  

export default {
    getAllUsers,
    getUserById,
    addUser,
    updateUser
};
