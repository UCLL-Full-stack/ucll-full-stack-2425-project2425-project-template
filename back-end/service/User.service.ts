import { User } from '../model/User';
import userDb from '../repository/User.db';

const getAllUsers = async (): Promise<User[]> => {
    return userDb.getAllUsers();
};

const getUserById = async (id: number): Promise<User> => {
    const user = userDb.getUserById(id);
    if (!user) {
        throw new Error(`User with id ${id} does not exist.`);
    }
    return user;
}

export default { 
    getAllUsers,
    getUserById
};
