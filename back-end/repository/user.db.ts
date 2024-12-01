import { PrismaClient } from "@prisma/client";
import { Playlist } from "../model/playlist";
import database from "../util/database";
import { User } from "../model/user";
import { Role, UserInput } from "../types";
import playlistDb from "./playlist.db";
import { User as UserPrisma } from '@prisma/client'
// dit moet nog aangepast worden, wnr we een echte autincrement id hebben in de db
let userId = 1;
const prisma = new PrismaClient();
const users: User[] = []

const createUser = async ({ firstName, lastName, username, email, password, role }: UserInput): Promise<UserPrisma> => {
    try {
        // Ensure the data passed to create the user does not include 'id' or 'playlists'
        const user = await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
                email: email,
                role: role,
                // No need to include 'id' and 'playlists' here, as Prisma handles them
            },
        });
        return user;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: {
                playlists: true,
            },
        }

        );

        return usersPrisma.map((usersPrisma) => User.from(usersPrisma));
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.');
    }
}

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                id: id
            },
        })

        return userPrisma ? User.from(userPrisma) : null

    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.');
    }
}

const addPlaylistToUser = async (userId: number, playlistId: number): Promise<User> => {
    try {
        const userPrisma = await database.user.update({
            where: { id: userId },
            data: {
                playlists: {
                    connect: { id: playlistId },
                },
            },
            include: { playlists: true }, 
        });
        return User.from(userPrisma)

    } catch (error) {
        console.error(error);
        throw new Error('Error adding playlist to user. See server log for details.');
    }
}

const getUserByUsername = async (username: string): Promise<User | null> => {

    try {
        const userPrisma = await database.user.findUnique({
            where: {
                username: username
            },
        })

        return userPrisma ? User.from(userPrisma) : null

    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllUsers,
    getUserById,
    addPlaylistToUser,
    createUser,
    getUserByUsername
}