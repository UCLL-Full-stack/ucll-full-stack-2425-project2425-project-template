import { Song } from "../model/song"

// dit moet nog aangepast worden, wnr we een echte autincrement id hebben in de db
let songId = 1;

const songs: Song[] = []

const createSong = (songData: {title: string, genre: string}): Song => {
    const song = new Song({
        ...songData,
        id: songId++
    });
    songs.push(song);
    return song;
}

const getAllSongs = () => {
    return songs
}

const getSongById = ({id}: { id: number}): Song | null => {
    try {
        return songs.find((song) => song.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllSongs,
    getSongById,
    createSong
}