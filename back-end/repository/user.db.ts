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

export default {
    getAll,
};
