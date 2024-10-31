import { User } from "../model/user"
import playlistDb from "../repository/playlist.db"
import userDb from "../repository/user.db"
import { UserInput } from "../types"

const getAllUsers = (): User[] => {
    return userDb.getAllUsers()
}

const createUser = ({
    firstName, lastName, username, email, password
}: UserInput): User => {
    const user = {firstName, lastName, username, email, password}

    if (!firstName) {
        throw new Error(`firstName is required`)
    }
    if (!lastName) {
        throw new Error(`lastName is required`)
    }
    if (!username) {
        throw new Error(`username is required`)
    }
    if (!email) {
        throw new Error(`email is required`)
    }
    if (!password) {
        throw new Error(`password is required`)
    }

    return userDb.createUser(user)
}

const getUserById = ({ id }: { id: number}): User | null => {
    const user = userDb.getUserById({ id })

    if (user === null) {
        throw new Error(`User with id ${id} does not exist`)
    }
    return user;
}

const addPlaylistToUser = ({
    userId,
    playlistId
}: {
    userId: number;
    playlistId: number;
}): User | undefined => {
    const user = userDb.getUserById({ id: userId })

    const playlist = playlistDb.getPlaylistById({ id: playlistId })

    const existingPlaylistIds = new Set(user?.getPlaylists().map(pl => pl.getId()));

    if (existingPlaylistIds.has(playlistId)) {
        throw new Error(`User already has a playlist with id ${playlistId}`);
    }

    const isPlaylistOwned = userDb.getAllUsers().some(otherUser =>
        otherUser.getPlaylists().some(pl => pl.getId() === playlistId)
    );

    if (isPlaylistOwned) {
        throw new Error(`Playlist with id ${playlistId} is already owned by another user`);
    }

    if (user === null) {
        throw new Error(`User with id ${userId} does not exist`)
    }

    if (playlist === null) {
        throw new Error(`Playlist with id ${playlistId} does not exist`)
    }
    return userDb.addPlaylistToUser({userId, playlistId})
}

export default {
    getAllUsers,
    getUserById,
    addPlaylistToUser,
    createUser
}