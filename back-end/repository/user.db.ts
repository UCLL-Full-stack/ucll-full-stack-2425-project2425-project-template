import { User } from "../model/user";
import { Event } from "../model/event";
import database from "./database";

const getAllUsers = async (): Promise<User[]> => {
    const usersPrisma = await database.user.findMany({
        include: {
            events: true,
        }
    });
    return usersPrisma.map((userPrisma) => User.from(userPrisma));
}

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    const userPrisma = await database.user.findUnique({
        where: {
            id: id,
        },
        include: {
            events: true,
        }
    });

    return userPrisma ? User.from(userPrisma) : null;
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    const userPrisma = await database.user.findFirst({
        where:
        {
            email: email
        },
        include: {
            events: true,
        }
    });

    return userPrisma ? User.from(userPrisma) : null;
};

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                username: user.getUsername(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                age: user.getAge(),
                role: user.getRole(),
                events: {}
            },
            include: {
                events: true,
            }
        });

        return User.from(userPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
};