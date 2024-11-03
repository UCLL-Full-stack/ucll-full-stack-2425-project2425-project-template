import userDB from '../repository/user.db';
import { User } from '../model/user';

const getAllUsers = (): User[] => userDB.getAllUsers();

const getUserById = (id: number): User => {
    const user = userDB.getUserById({ id });
    if (!user) throw new Error(`User with id ${id} does not exist`);
    return user;
}

const getUserByEmail = (email: string): User => {
    const user = userDB.getUserByEmail({ email: email.toLowerCase() });
    if (!user) throw new Error(`User with email ${email} does not exist`);
    return user;
}

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
};