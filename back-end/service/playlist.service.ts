import { Playlist } from "../model/playlist";
import playlistDb from "../repository/playlist.db";
import songDb from "../repository/song.db";
import { PlaylistInput } from '../types';

const createPlaylist = ({
    name
}: PlaylistInput): Playlist => {
    if (!name) {
        throw new Error("Playlist name is required")
    }
    const playlist = {name}
    return playlistDb.createPlaylist(playlist)
}

const getAllPlaylists = (): Playlist[] => {
    return playlistDb.getAllPlaylists()
}

const getPlaylistById = ({ id }: { id: number}): Playlist | null => {
    const playlist = playlistDb.getPlaylistById({ id })

    if (playlist == null) {
        throw new Error(`Playlist with id ${id} does not exist`) 
    }
    return playlist;
}

const addSongToPlaylist = ({
    playlistId,
    songId
}: {
    playlistId: number;
    songId: number;
}): Playlist | undefined => {
    const playlist = playlistDb.getPlaylistById({ id: playlistId })

    const song = songDb.getSongById({ id: songId })

    const existingSongsIds = new Set(playlist?.getSongs().map(song => song.getId()));

    if (existingSongsIds.has(songId)) {
        throw new Error(`Playlist already has a song with id ${songId}`);
    }

    if (playlist === null) {
        throw new Error(`Playlist with id ${playlistId} does not exist`)
    }

    if (song === null) {
        throw new Error(`Song with id ${songId} does not exist`)
    }
    return playlistDb.addSongToPlaylist({playlistId, songId})
}

export default {
    getAllPlaylists,
    getPlaylistById,
    createPlaylist,
    addSongToPlaylist
}