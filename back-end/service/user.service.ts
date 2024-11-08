import { User } from "../model/user";
import userDb from "../repository/user.db"

const getAllUsers = async (): Promise<User[]> => {
    return userDb.getAllUsers();
};

const getUserById = async (id: number): Promise<User | null> => {
    return userDb.getUserById({ id });
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    return userDb.getUserByEmail(email);
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
}