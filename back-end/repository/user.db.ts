import { User } from '../model/user';
import {
    User as UserPrisma
} from '@prisma/client'
import database from './database';

const everything = {
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
            include: everything
        });
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                id
            },
            include: everything
        });
        if (!userPrisma) {
            throw new Error(`User with id ${id} does not exist.`);
        }
        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    }
}

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                username
            },
            include: everything
        });
        if (!userPrisma) {
            throw new Error(`User with id ${username} does not exist.`);
        }
        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    }
}

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                username: user.getUsername(),
                hashedPassword: user.getHashedPassword(),
                profile: user.getProfile() ? {
                    create: {
                        email: user.getProfile()?.getEmail() || '',
                        firstName: user.getProfile()?.getFirstName() || '',
                        lastName: user.getProfile()?.getLastName() || '',
                        bio: user.getProfile()?.getBio() || ''
                    }
                } : undefined
            },
            include: everything
        });
        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    }
};

export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
};
