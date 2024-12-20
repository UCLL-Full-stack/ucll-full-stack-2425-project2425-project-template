import { Playlist } from "../model/playlist";
import database from "../util/database";
import songDb from "./song.db";

const createPlaylist = async (playlist: Playlist): Promise<Playlist> => {
    const songs = playlist.getSongs()
    const user = playlist.getUser()
    try {
        const playlistPrisma = await database.playlist.create({
            data: {
                name: playlist.getName(),
                totalNumbers: songs.length,
                user: {
                    connect: { id: user.getId() },
                },
            },
            include: { user: true, songs: true },
        });

        return Playlist.from(playlistPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const getAllPlaylists = async (): Promise<Playlist[]> => {
    try {
        const playlistsPrisma = await database.playlist.findMany({
            include: {
                user: true,
                songs: true
            }
        });
        return playlistsPrisma.map((playlistPrisma) => Playlist.from(playlistPrisma))
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getPlaylistsFromUser = async ({ username }: {username: string}): Promise<Playlist[]> => {
    try {
        const playlistsPrisma = await database.playlist.findMany({
            where: { user: { username } },
            include: {
                user: true,
                songs: true
            }
        });
        return playlistsPrisma.map((playlistPrisma) => Playlist.from(playlistPrisma))
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getPlaylistById = async ( { id }: { id: number }): Promise<Playlist | null> => {
    try {
        const playlistPrisma = await database.playlist.findUnique({
            where: { id },
            include: {
                user: true,
                songs: true,
            },
        });
        return playlistPrisma ? Playlist.from(playlistPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const UpdateAndAddSongToPlaylist = async ({
    playlist,
}: {
    playlist: Playlist;
}): Promise<Playlist | null> => {
    try {
        const currentSongs = playlist.getSongs();
        const newSongIds = currentSongs.map((song) => ({ id: song.getId() }));

        const playlistPrisma = await database.playlist.update({
            where: { id: playlist.getId() },
            data: {
                songs: {
                    connect: newSongIds,
                },
                totalNumbers: {
                    increment: 1,
                },
            },
            include: {
                user: true,
                songs: true,
            },
        });

        return playlistPrisma ? Playlist.from(playlistPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};



export default {
    getAllPlaylists,
    getPlaylistById,
    createPlaylist,
    UpdateAndAddSongToPlaylist,
    getPlaylistsFromUser
}