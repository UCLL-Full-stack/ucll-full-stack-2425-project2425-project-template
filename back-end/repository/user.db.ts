import { User } from '../model/user';
import database from './database';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const result = await database.user.findMany();
        return result.map((userprisma) => User.from(userprisma));
    } catch (error) {
        console.error(error);
        throw new Error(`Database error: see logs`);
    }
};

const getUserByEmail = async (email: string): Promise<User> => {
    try {
        const result = await database.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!result) {
            throw new Error('User not found.');
        }
        return User.from(result);
    } catch (error) {
        console.error(error);
        throw new Error(`Database error: see logs`);
    }
};

const createUser = async (user: User): Promise<User> => {
    try {
        const result = await database.user.create({
            data: {
                name: user.getName(),
                email: user.getEmail(),
                role: user.getRole(),
                password: user.getPassword(),
                birthday: user.getBirthday(),
            },
        });
        return User.from(result);
    } catch (error) {
        console.error(error);
        throw new Error(`Database error: see logs`);
    }
};

const updateUser = async (user: User): Promise<User> => {
    try {
        const result = await database.user.update({
            where: {
                email: user.getEmail(),
            },
            data: {
                name: user.getName(),
                role: user.getRole(),
                password: user.getPassword(),
                birthday: user.getBirthday(),
            },
        });
        return User.from(result);
    } catch (error) {
        console.error(error);
        throw new Error(`Database error: see logs`);
    }
};

export default {
    getAllUsers,
    createUser,
    getUserByEmail,
    updateUser,
};
