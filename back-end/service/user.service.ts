import { User } from '../model/user';
import { UserInput } from '../types';
import userDB from '../repository/user.db';

const getAllUsers = async (): Promise<User[]> => {
    return await userDB.getAllUsers();
};

const getUserById = async (id: number): Promise<User> => {
    const user = await userDB.getUserById({ id });
    if (!user) throw new Error(`User with id ${id} not found`);
    return user;
};

const getUserByEmail = async (email: string): Promise<User> => {
    const user = await userDB.getUserByEmail({ email: email.toLowerCase() });
    if (!user) throw new Error(`User with email ${email} not found`);
    return user;
};

const registerUser = async ( userInput: UserInput ): Promise<User> => {
    const existingUser = await userDB.getUserByEmail({ email: userInput.email.toLowerCase() });
    if (existingUser) { // Checking for duplicate accounts
        throw new Error(`User with email ${userInput.email} already exist`);
    }

    const user = new User(userInput);
    return await userDB.registerUser({ user });
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    registerUser,
};