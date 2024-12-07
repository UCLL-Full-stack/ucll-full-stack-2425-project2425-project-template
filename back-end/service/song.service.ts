import { Song } from "../model/song";
import songDb from "../repository/song.db";
import userDb from "../repository/user.db";
import { UnauthorizedError } from 'express-jwt';
import { Role, SongInput } from "../types";

const createSong = async ({
    title, 
    genre
}: SongInput): Promise<Song> => {

    if (!title?.trim()) {
        throw new Error('title is required')
    }
    if (!genre?.trim()) {
        throw new Error('Genre is required')
    }
    const song = new Song({title, genre})
    return await songDb.createSong(song)
}

const getAllSongs = async ({role} : {role: Role}): Promise<Song[]> => {
    if (!role) {
        throw new UnauthorizedError('credentials_required' as any, { message: 'Unauthorized access' })
    } else {
        return await songDb.getAllSongs();
    }
}

const getSongById = async ({ id }:{ id: number }): Promise<Song | null> => {
    const song = await songDb.getSongById({id})

    if (song === null){
        throw new Error(`User with id ${id} does not exist`)
    }
    return song
}

export default {
    createSong,
    getAllSongs,
    getSongById
}

