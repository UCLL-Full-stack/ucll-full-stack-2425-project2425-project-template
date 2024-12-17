import { User } from '../model/user';
import database from '../util/database';

// const users: User[] = [
//     new User({ user_id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 't'}),
//     new User({ user_id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', password: 't'})
// ]

const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany();
        return userPrisma.map((user) => User.from(user));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async (id: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                id: id,
            },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllUsers, getUserById };
