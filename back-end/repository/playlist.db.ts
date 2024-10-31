import { Playlist } from "../model/playlist";
import songDb from "./song.db";

// dit moet nog aangepast worden, wnr we een echte autincrement id hebben in de db
let playlistId = 1;

const playlists: Playlist[] = []

const createPlaylist = (playlistData: {name: string}): Playlist => {

    const playlist = new Playlist({
        ...playlistData,
        totalNumbers: 0,
        id: playlistId++,
        songs: []
    });
    playlists.push(playlist);

    return playlist
}

const getAllPlaylists = (): Playlist[] => {
    return playlists
}

const getPlaylistById = ( { id }: { id: number }): Playlist | null => {
    try {
        return playlists.find((playlist) => playlist.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const addSongToPlaylist = ({
    playlistId,
    songId,
}: {
    playlistId: number,
    songId: number
}): Playlist | undefined => {
    const playlist = getPlaylistById({ id: playlistId });
    const song = songDb.getSongById({ id: songId});

    if (playlist && song) {
        playlist.addSong(song);
        return playlist;
    }
}


export default {
    getAllPlaylists,
    getPlaylistById,
    createPlaylist,
    addSongToPlaylist
}