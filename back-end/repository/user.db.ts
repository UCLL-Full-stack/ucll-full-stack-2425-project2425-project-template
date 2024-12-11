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

export default {
    getAllUsers,
};
