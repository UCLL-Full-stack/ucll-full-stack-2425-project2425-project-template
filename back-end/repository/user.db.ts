import { Playlist } from "../model/playlist";
import { User } from "../model/user";
import playlistDb from "./playlist.db";

// dit moet nog aangepast worden, wnr we een echte autincrement id hebben in de db
let userId = 1;

const users: User[] = []

const createUser = (
    userData: {
        firstName: string,
        lastName: string,
        username: string,
        email: string,
        password: string
    }
): User => {
    const user = new User({
        ...userData,
        playlists: [],
        id: userId++
    })
    users.push(user);

    return user;
}

const getAllUsers = (): User[] => {
    return users;
}

const getUserById = ({ id }: { id: number }): User | null => {
    try {
        return users.find((user) => user.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const addPlaylistToUser = ({
    userId,
    playlistId
}: {
    userId: number;
    playlistId: number;
}): User | undefined => {
    const user = getUserById({id: userId})
    const playlist = playlistDb.getPlaylistById({id: playlistId})

    if (user && playlist) {
        user.addPlaylist(playlist);
        return user;
    }
}

export default {
    getAllUsers,
    getUserById,
    addPlaylistToUser,
    createUser
}