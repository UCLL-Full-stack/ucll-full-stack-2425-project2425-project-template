import { User } from "../model/user";
import { Guild } from "../model/guild";
import guildDb from "./guild.db";

const users: User[] = [];

const addUser = (user: User): void => {
    if (getUserById(user.getUserId())) {
        throw new Error("User already exists");
    }
    users.push(user);
};

const getUserById = (userId: string): User | null => {
    return users.find(user => user.getUserId() === userId) || null;
};

const updateUser = (userId: string, updatedData: { username?: string; userTag?: string; guilds?: Guild[] }): void => {
    const user = getUserById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    if (updatedData.username) user.setUsername(updatedData.username);
    if (updatedData.userTag) user.setGlobalName(updatedData.userTag);
    if (updatedData.guilds) user.setGuilds(updatedData.guilds);
};

const getAllUsers = (): User[] => {
    return users;
};

export default {
    addUser,
    getUserById,
    updateUser,
    getAllUsers,
};
