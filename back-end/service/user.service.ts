import { User } from '../model/user';
import userDB from '../repository/user.db';

const getAllUsers = async (): Promise<User[]> => {
    return await userDB.getAllUsers();
};

export default {
    getAllUsers,
};
