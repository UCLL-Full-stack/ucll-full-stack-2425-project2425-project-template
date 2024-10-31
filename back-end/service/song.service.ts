import { Song } from "../model/song";
import songDb from "../repository/song.db";
import userDb from "../repository/user.db";
import { SongInput } from "../types";

const createSong = ({
    title, genre
}: SongInput): Song => {

    if (!title) {
        throw new Error('title is required')
    }
    if (!genre) {
        throw new Error('Genre is required')
    }
    const song = {title, genre}
    return songDb.createSong(song)
}

const getAllSongs = (): Song[] => {
    return songDb.getAllSongs();
}

const getSongById = ({ id }:{ id: number }): Song | null => {
    const song = songDb.getSongById({id})

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

