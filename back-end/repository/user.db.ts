import { User } from '../model/user'
import bcrypt from 'bcrypt'
import database from './database'
import { Account } from '@prisma/client';

type UserPrisma = {
    id: number;
    username: string;
    email: string;
    password: string;
    account?: { bio: string | null };
};

const createUserWithAccount = async ({
    id,
    username,
    email,
    password,
    bio,
}: {
    id: number;
    username: string;
    email: string;
    password: string;
    bio: string;
}): Promise<User> => {
    try {
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            throw new Error(`User with username ${username} is already registered.`);
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = {
            id,
            username,
            email,
            password: hashedPassword,
            accountId: id,
        };

        const createdUser = await database.user.create({ data: newUser });

        const createdAccount = await database.account.create({
            data: {
                id: id,
                userId: createdUser.id,
                bio: bio,
            },
        });

        const user = User.from({
            id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email,
            password: createdUser.password,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt,
            accountId: createdAccount.id,
        });
        
        return user;

    } catch (error) {
        if (error instanceof Error) {
            console.error("Error creating user:", error.message);
        } else {
            console.error("Error creating user:", error);
        }
        throw error;
    }
};

const getUserByUsername = async (username: string): Promise<User | null> => {
    try {
        const user = await database.user.findUnique({
            where: {
                username,
            },
        });

        if (!user) {
            return null;
        }

        return User.from(user);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error getting user by username:", error.message);
        } else {
            console.error("Error getting user by username:", error);
        }
        throw error;
    }
};

export default {createUserWithAccount, getUserByUsername}