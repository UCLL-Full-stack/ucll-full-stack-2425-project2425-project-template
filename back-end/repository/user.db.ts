import { User } from "../model/user";
import { Guild } from "../model/guild";
import guildDb from "./guild.db";

const users: User[] = [];

const user1 = new User("user1", "Alice", "alice#1234", [guildDb.getGuildById("guild1")!, guildDb.getGuildById("guild2")!]);
const user2 = new User("user2", "Bob", "bob#5678", [guildDb.getGuildById("guild2")!]);
const user3 = new User("user3", "Charlie", "charlie#9012", [guildDb.getGuildById("guild1")!, guildDb.getGuildById("guild3")!]);

users.push(user1, user2, user3);

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
    if (updatedData.userTag) user.setUserTag(updatedData.userTag);
    if (updatedData.guilds) user.setGuilds(updatedData.guilds);
};

const removeUser = (userId: string): void => {
    const userIndex = users.findIndex(user => user.getUserId() === userId);
    if (userIndex === -1) {
        throw new Error("User not found");
    }
    users.splice(userIndex, 1);
};

const getAllUsers = (): User[] => {
    return users;
};

export default {
    addUser,
    getUserById,
    updateUser,
    removeUser,
    getAllUsers,
};
