import { Album } from "../model/album"
import albumDb from "../repository/album.db";

const getAlbums = (): Album[] => {
    return albumDb.getAlbums();
};

const getAlbumById = (id: number): Album => {
    const album = albumDb.getAlbumById(id);
    if (!album){
        throw new Error(`album with id ${id} doesn't exist`);
    }

    return album;
};

export default {
    getAlbums,
    getAlbumById
}
