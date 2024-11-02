import { User } from '../model/user';
import userDb from '../repository/user.db';

const getAllUsers = () => {
    return userDb.getAllUsers();
}

const getUser = (userId: string) => {
    return userDb.getUserById(userId);
}

const createUser = (user: User) => {
    userDb.addUser(user);
}

const updateUser = (userId: string, updatedData: { username?: string; userTag?: string; guilds?: any[] }) => {
    userDb.updateUser(userId, updatedData);
}

const deleteUser = (userId: string) => {
    userDb.removeUser(userId);
}

export default {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
