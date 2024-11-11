import { ro } from 'date-fns/locale';
import { User } from '../model/user';
import { resolve } from 'path';
import exp from 'constants';
import database from './database';

export const users = [
    new User({
        id: 1,
        role: 'admin',
        name: 'admin',
        firstName: 'admin',
        password: 'admin',
    }),
    new User({
        id: 2,
        role: 'user',
        name: 'user',
        firstName: 'user',
        password: 'user',
    }),
];

const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany({
            include: { chats: true },
        });
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async (id: number): Promise<User | undefined> => {
    return users.find((user) => user.getId() === id);
};

const getUserByName = async (name: string): Promise<User | undefined> => {
    return users.find((user) => user.getName() === name);
};

const createUser = async (user: User): Promise<User> => {
    users.push(user);
    return user;
};

export default { getAllUsers, getUserById, createUser, getUserByName };
