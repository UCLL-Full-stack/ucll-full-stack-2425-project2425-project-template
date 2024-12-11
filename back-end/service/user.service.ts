
import { User } from '../model/user';
import userDb from '../repository/user.db';

const getAllUsers = (): User[] => {
    const users = userDb.getAllUsers();
    if (!users) {
        throw new Error('No users found');
    }
    return users;
};

const getUserById = (id: number): User => {
    const user = userDb.getUserById(id);
    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }
    return user;
};

export default { getAllUsers, getUserById };
