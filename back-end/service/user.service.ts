import { Guild } from "../model/guild";
import { User } from "../model/user";
import guildDb from "../repository/guild.db";
import userDb from "../repository/user.db";
import { CreateUserInput, UpdateUserInput } from "../types";



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

export default {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    getUserGuilds
}