import { User } from '../model/user';
import database from '../util/database';

const addUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                name: user.getName(),
                password: user.getPassword(),
                email: user.getEmail(),
                role: user.getRole(),
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    if (!email) {
        throw new Error('Email is required.');
    }
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                email,
            },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteUserById = async (id: number): Promise<User> => {
    try {
        const userPrisma = await database.user.delete({
            where: {
                id,
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllUsers,
    addUser,
    getUserByEmail,
    deleteUserById,
};