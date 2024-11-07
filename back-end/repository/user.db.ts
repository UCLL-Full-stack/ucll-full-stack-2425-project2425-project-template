import { Role } from "../types";
import database from "./database";

const createUser = async ({ firstName, lastName, email, password, role }: { 
    firstName: string; 
    lastName: string; 
    email: string; 
    password: string; 
    role: Role;
}) => {
    const user = await database.user.create({
        data: {
            firstName,
            lastName,
            email,
            password,
            role
        }
    });
    return user;
};

const getAllUsers = async () => {
    return await database.user.findMany({
        include: {
            projects: true,
            tasks: true
        }
    });
};

const getUserById = async (userId: number) => {
    return await database.user.findUnique({
        where: { userId },
        include: {
            projects: true,
            tasks: true
        }
    });
};

const getUserByEmail = async (email: string) => {
    return await database.user.findUnique({
        where: { email },
        include: {
            projects: true,
            tasks: true
        }
    });
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail
};
