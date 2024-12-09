import { get } from "http";
import { User } from "../model/User";
import database from "../util/database";

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllPlayers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            where: {
                role: 'PLAYER'
            }
        });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllCoaches = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            where: {
                role: 'COACH'
            }
        });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllAdmins = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            where: {
                role: 'ADMIN'
            }
        });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getUserById = async (userId: number): Promise<User> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                userId: userId
            }
        });
        if (userPrisma === null) {
            throw new Error('User not found');
        }
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}


export default { getAllUsers, getAllPlayers, getAllCoaches, getAllAdmins, getUserById };  

