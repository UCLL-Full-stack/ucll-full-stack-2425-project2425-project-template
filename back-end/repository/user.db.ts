import { User } from '../model/user';
import db from './db';

const getAll = async (): Promise<User[]> => {
    try {
        const userPrisma = await db.user.findMany();
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Could not get all users');
    }
};

const getByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
        const userPrisma = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (!userPrisma) {
            return null;
        }

        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Could not get user by email');
    }
};

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await db.user.create({
            data: {
                email: user.getEmail(),
                password: user.getPassword(),
            },
        });

        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Could not create user');
    }
};

export default {
    getAll,
    getByEmail,
    createUser,
};
