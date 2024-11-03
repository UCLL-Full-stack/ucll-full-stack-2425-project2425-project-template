import { List } from "../model/list"
import { ListInput } from "../types";
import listDb from "../repository/list.db";
import { Album } from "../model/album";
import albumDb from "../repository/album.db";

const getLists = (): List[] => {
    return listDb.getAllLists();
};

const createList = (list: ListInput): List => {

    const listAlbums: Album[] = [];

    if(!list.albums || list.albums.length == 0){
        throw new Error('a list must have at least 1 album');
    }
    
    list.albums.forEach((albumId)=>{
        const album = albumDb.getAlbumById(albumId);
        if(!album){ throw new Error(`album with id ${albumId} doesn't exist'`)}
        listAlbums.push(album);
    });

    try{
        const newList = new List({
            title: list.title,
            description: list.description,
            albums: listAlbums
        });

        return listDb.createList(newList);
    }catch(e){
        throw e;
    }

}

export default {
    getLists, 
    createList
}
