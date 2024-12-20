import { Song } from "../model/song"
import database from "../util/database"

const createSong = async (song: Song): Promise<Song> => {
    try {
        const songPrisma = await database.song.create ({
        data : {
            title: song.getTitle(),
            genre: song.getGenre()
        }
    })
        return Song.from(songPrisma)
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllSongs = async (): Promise<Song[]> => {
    try {
        const songPrimsa = await database.song.findMany()
        return songPrimsa.map((songPrimsa) => Song.from(songPrimsa))
    } catch(error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getSongById = async ({id}: { id: number}): Promise<Song | null> => {
    try {
        const songPrisma = await database.song.findUnique({
            where: {
                id: id
            }
        })
        return songPrisma ? Song.from(songPrisma) : null
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const deleteSongById = async ({ id }: { id: number }): Promise<boolean> => {
    try {
        const song = await database.song.delete({
            where: { id: id }
        });
        return song ? true : false;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllSongs,
    getSongById,
    createSong,
    deleteSongById
}