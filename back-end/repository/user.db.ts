import { User } from "../model/user";
import database from "./database";

const getAllUsers = async () => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        throw new Error("Database error. See server log for details.");
    }
}

const getUserById = async ({ id }: { id: number }) => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                id: id,
            }
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        throw new Error("Database error. See server log for details.");
    }
};

const getUserByEmail = async (email: string) => {
    try {
        const userPrisma = await database.user.findFirst({
            where:
            {
                email: email
            }
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        throw new Error("Database error. See server log for details.");
    }
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
};