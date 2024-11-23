import database from '../util/database';
import { User } from '../model/User';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany();
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Error in database file at getAllUsers');
    }
};

const getUserById = async (id: number): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!userPrisma) {
            return null;
        }
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Error in database file at getUserById');
    }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: {
                email: email,
            },
        });
        if (!userPrisma) {
            return null;
        }
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Error in database file at getUserByEmail');
    }
};

const getUserByUsername = async (username: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: {
                username: username,
            },
        });
        if (!userPrisma) {
            return null;
        }
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Error in database file at getUserByUsername');
    }
};

const createUser = async ({
    username,
    password,
    email,
    firstName,
    lastName,
    recipes,
    reviews,
}: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                username,
                password,
                email,
                firstName,
                lastName,
                recipes: {
                    connect: recipes?.map((recipe) => ({ id: recipe.id })),
                },
                reviews: {
                    connect: reviews?.map((review) => ({ id: review.id })),
                },
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Error in database file at createUser');
    }
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    createUser,
};
