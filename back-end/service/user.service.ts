import { User } from "../model/user";
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

export default {
    getAllUsers,
    getUserById,
    addUser,
    updateUser
}