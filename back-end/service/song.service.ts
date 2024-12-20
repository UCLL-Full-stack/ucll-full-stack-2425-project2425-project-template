import { Song } from "../model/song";
import songDb from "../repository/song.db";
import userDb from "../repository/user.db";
import { UnauthorizedError } from 'express-jwt';
import { Role, SongInput, UserInput } from "../types";

const createSong = async (
    songInput: SongInput,
    userInput: UserInput
): Promise<Song> => {

    if (!userInput || !userInput.id) {
        throw new Error('User ID is required');
    }
    
    const user = await userDb.getUserById({id: userInput.id})

    if (!user) throw new Error('User not found');

    if (!songInput.title?.trim()) {
        throw new Error('Title is required');
    }
    if (!songInput.genre?.trim()) {
        throw new Error('Genre is required');
    }

    if (user.getRole() === 'user') {
        throw new Error('A user cannot make songs')
    }
    
    const song = new Song({title: songInput.title, genre: songInput.genre});
    return await songDb.createSong(song);
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
        throw new Error(`Song with id ${id} does not exist`)
    }
    return song
}


const deleteSongById = async ({ id }:{ id: number }, userInput : UserInput): Promise<boolean> => {

    if (!userInput || !userInput.id) {
        throw new Error('User ID is required');
    }
    
    const user = await userDb.getUserById({id: userInput.id})

    if (!user) throw new Error('User not found');

    if (user.getRole() === 'user') {
        throw new Error('A user cannot delete songs')
    }


    const song = await songDb.deleteSongById({id})

    if (song === null){
        throw new Error(`Song with id ${id} does not exist`)
    }
    return song
}



export default {
    createSong,
    getAllSongs,
    getSongById,
    deleteSongById
}

