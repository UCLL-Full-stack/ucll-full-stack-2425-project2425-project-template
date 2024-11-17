import { User } from '../model/user';
import {
    User as UserPrisma
} from '@prisma/client'
import database from './database';

const users = [
    new User({
        id: 1,
        username: 'meesverbeeck',
        hashedPassword: 't'
    }),
    new User({
        id: 2,
        username: 'larsfrancois',
        hashedPassword: 't'
    }),
];

const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany({
            include: {
                profile: true,
                groups: {
                    include: {
                        boards: {
                            include: {
                                statuses: {
                                    include: {
                                        tasks: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    }
};

const getUserById = ({ id }: { id: number }): User | null => {
    const user = users.find((user) => user.getId() === id);
    if (!user) {
        return null;
    }
    return user; 
}

const getUserByUsername = ({ username }: { username: string }): User | null => {
    const user = users.find((user) => user.getUsername() === username);
    if (!user) {
        return null;
    }
    return user; 
}

const createUser = (user: User): User => {
    users.push(user);
    return user;
};

export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
};
