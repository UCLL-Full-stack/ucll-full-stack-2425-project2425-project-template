import database from "../util/database";
import { User } from "../model/User";

const getAllUsers = async (): Promise<User[]> => {
    const userPrisma = await database.user.findMany();

    if (!userPrisma || userPrisma.length === 0) {
        return [];
    }

    return userPrisma.map((userPrisma) => User.from(userPrisma));
};

const getUserById = async (id: number): Promise<User | null> => {
    const userPrisma = await database.user.findUnique({
        where: {
            id: id,
        },
    });

    if (!userPrisma) {
        return null;
    }

    return User.from(userPrisma);
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    const userPrisma = await database.user.findFirst({
        where: {
            email: email,
        },
    });

    if (!userPrisma) {
        return null;
    }

    return User.from(userPrisma);
}

const getUserByUsername = async (username: string): Promise<User | null> => {
    const userPrisma = await database.user.findFirst({
        where: {
            username: username,
        },
    });

    if (!userPrisma) {
        return null;
    }

    return User.from(userPrisma);
}

const createUser = async (user: User): Promise<User> => {
    const userPrisma = await database.user.create({
        data: {
            username: user.username,
            password: user.password,
            email: user.email,
        },
    });

    return User.from(userPrisma);
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    createUser,
};