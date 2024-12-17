import { User } from '../model/user';
import userDb from '../repository/user.db';

const getAllUsers = async (): Promise<User[]> => {
    const users = await userDb.getAllUsers();
    if (!users) {
        throw new Error('No users found');
    }
    return users;
};

const getUserById = async (id: string): Promise<User | null> => {
    const user = await userDb.getUserById(id);
    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }
    return user;
};

export default { getAllUsers, getUserById };
