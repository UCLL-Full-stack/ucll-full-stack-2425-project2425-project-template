import { User } from "../model/user"
import playlistDb from "../repository/playlist.db"
import userDb from "../repository/user.db"
import { AuthenticationResponse, Role, UserInput } from "../types"
import { generateJwtToken } from "../util/jwt"
import bcrypt from 'bcrypt';
import {User as UserPrisma} from "@prisma/client"

const getAllUsers = (): Promise<User[]> => {
    return userDb.getAllUsers()
}

const createUser = async ({ id, firstName, lastName, username, email, password, role }: UserInput): Promise<User> => {
    const existing_user = await getUserByUsername(username, true);

    if (existing_user) {
        throw new Error(`User with username ${username} already exists`);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user_role: Role = role ? role : 'user';

    const new_user = new User({
        id,
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        role: user_role,
        playlists: [],
    });

    return new_user;
};


const getUserById = ({ id }: { id: number}): Promise<User | null> => {
    const user = userDb.getUserById({ id })

    if (user === null) {
        throw new Error(`User with id ${id} does not exist`)
    }
    return user;
}

const addPlaylistToUser = async ({
    userId,
    playlistId
}: {
    userId: number;
    playlistId: number;
}): Promise<User> => {

    const user = await userDb.getUserById({ id: userId });

    const playlist = await playlistDb.getPlaylistById({ id: playlistId });
    if (!user) {
        throw new Error(`User with id ${userId} does not exist`);
    }
    if (!playlist) {
        throw new Error(`Playlist with id ${playlistId} does not exist`);
    }
    const existingPlaylistIds = new Set(user.getPlaylists().map(pl => pl.getId()));
    if (existingPlaylistIds.has(playlistId)) {
        throw new Error(`User already has a playlist with id ${playlistId}`);
    }
    userDb.addPlaylistToUser(userId,playlistId);

    return user; 
};


const getUserByUsername = async (username:string, accept_null:boolean=false): Promise<User | null> => {
    // const regexRnummer = new RegExp('^r\\d{7}$');

    // if (!regexRnummer.test(username)) {
    //     throw new Error("Username hasn't the good format ")
    // }

    const user = await userDb.getUserByUsername(username)
    if(!accept_null) {
        if (user == null) {
            throw new Error(`User with ${username} doesn't exist`)
        }
    }
    return user;
}


const authenticate = async ({username, password}: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername(username);
    if (!user || !user.password) { 
        throw new Error('User not found or password missing');
    }
    const isValid = bcrypt.compare(password, user.password);

    if(!isValid) { 
        throw new Error('Incorrect password');
    }
    
    return {
        token: generateJwtToken({username, role: user?.role}),
        username,
        email: user?.email,
        role: user?.role
    }
};

export default {
    getAllUsers,
    getUserById,
    addPlaylistToUser,
    createUser,
    authenticate
}