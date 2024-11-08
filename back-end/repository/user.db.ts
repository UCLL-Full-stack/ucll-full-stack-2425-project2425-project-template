import { User } from "../model/user";
import database from "./database";

const getAllUsers = async (): Promise<User[]> => {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
}

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
        const userPrisma = await database.user.findUnique({
            where: {
                id: id,
            }
        });

        return userPrisma ? User.from(userPrisma) : null;
};

const getUserByEmail = async (email: string): Promise<User | null> => {
        const userPrisma = await database.user.findFirst({
            where:
            {
                email: email
            }
        });

        return userPrisma ? User.from(userPrisma) : null;
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
};