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
            include: { chats: true,groupchats: true },
        });
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async (id: number): Promise<User | undefined> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
            include: { chats: true , groupchats: true},
        });
        return userPrisma ? User.from(userPrisma) : undefined;
        
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
        
    }
};

const getUserByName = async (name: string): Promise<User | undefined> => {
    try{
        const userPrisma = await database.user.findFirst({
            where: { name },
            include: { chats: true,groupchats: true },
        });
        return userPrisma ? User.from(userPrisma) : undefined;
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                name: user.getName(),
                firstName: user.getFirstName(),
                password: user.getPassword(),
                role: user.getRole(),

            },
            include: { chats: true, groupchats: true },
        });
        return User.from(userPrisma);

    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');  
    }
};

export default { getAllUsers, getUserById, createUser, getUserByName };
