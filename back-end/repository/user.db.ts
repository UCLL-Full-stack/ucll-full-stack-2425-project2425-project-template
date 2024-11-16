import { User } from "../model/user";
import database from "./database";

const createUser = async ({ firstName, lastName, email, password, role }: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                firstName,
                lastName,
                email,
                password,
                role
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("error creating user");
    }
};

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: {
                projects: true,
                tasks: true
            }
        });
        console.log("Fetched users from database:", usersPrisma);
        return usersPrisma.map(user => User.from(user));
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("error fetching users");
    }
};

const getUserById = async ({ id }: { id: number }) => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                userId: id
            },
            include: {
                projects: true,
                tasks: true
            }
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error("Error fetching user by id:", error);
        throw new Error("error fetching user by id");
    }
};

export default {
    createUser,
    getAllUsers,
    getUserById,
};
