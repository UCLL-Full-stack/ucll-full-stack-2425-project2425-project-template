import { Playlist } from "../model/playlist";
import playlistDb from "../repository/playlist.db";
import songDb from "../repository/song.db";
import userDb from "../repository/user.db";
import { PlaylistInput, Role, SongInput, UserInput } from '../types';
import { UnauthorizedError } from 'express-jwt';


const createPlaylist = async ({
    name,
    user: userInput
}: PlaylistInput): Promise<Playlist> => {

    if (!userInput || !userInput.id) {
        throw new Error('User is required');
    }

    const user = await userDb.getUserById({id: userInput.id})

    if (!user) throw new Error('User not found');

    if (!name?.trim()) {
        throw new Error('name is required')
    }

    if (!user) {
        throw new Error('user is required')
    }

    if (user.getRole() === 'user') {

        if (user.getSubscription()?.getType() === 'basic') {
            const userPlaylists = await playlistDb.getPlaylistsFromUser({ username: user.getUsername() });
            if (userPlaylists.length >= 3) {
                throw new Error('Basic subscription users can only create up to 3 playlists.');
            }
        } 
    }

    const playlist = new Playlist({ name, user, totalNumbers: 0, songs: []});
    return await playlistDb.createPlaylist(playlist);
}

const getAllPlaylists = async ({ username, role }: { username: string, role: Role }): Promise<Playlist[]> => {
    if (role === 'admin') {
        return await playlistDb.getAllPlaylists();
    }
    if (role === 'artist') {
        return await playlistDb.getAllPlaylists();
    } 
    else if (role === 'user') {
        return await playlistDb.getPlaylistsFromUser({username})
    }
    else {
        throw new UnauthorizedError('credentials_required' as any, { message: 'Unauthorized access' })
    }
}

const getPlaylistById = async ({ id }: { id: number}): Promise<Playlist | null> => {
    const playlist = await playlistDb.getPlaylistById({ id })

    if (playlist == null) {
        throw new Error(`Playlist with id ${id} does not exist`) 
    }
    return playlist;
}

const addSongToPlaylist = async ({
    playlist: playlistInput,
    songs: songsInput
}: {
    playlist: PlaylistInput;
    songs: SongInput[]
}): Promise<Playlist | null> => {

    if (!playlistInput.id) {
        throw new Error('Playlist ID is required');
    }

    const playlist = await playlistDb.getPlaylistById({ id: playlistInput.id })

    if (!playlist) {
        throw new Error(`Playlist not found`)
    }


    const songs = await Promise.all(
        songsInput.map(async( songInput ) => {

            if (!songInput.id) {
                throw new Error('Song ID is required');
            }

            const song = await songDb.getSongById({id: songInput.id})

            if (song && playlist.getSongs().some(s => s.getId() === song.getId())) {
                throw new Error(`This song is already added to the playlist`)
            }

            if (!song) {
                throw new Error(`Song is not found`)
            }
            return song;
        })
    )

    songs.forEach((song) => {
        playlist.addSongtoPlaylist(song)
    })

    return await playlistDb.UpdateAndAddSongToPlaylist({ playlist })
}

export default {
    getAllPlaylists,
    getPlaylistById,
    createPlaylist,
    addSongToPlaylist
}