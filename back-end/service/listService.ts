import { List } from "../model/list"
import { ListInput } from "../types";
import listDb from "../repository/list.db";

const getLists = async (): Promise<List[]> => {
    try{
        return await listDb.getAllLists();
    }catch(e){
        throw e;
    }
};

const getUserLists = async (id: number): Promise<List[]> => {
    try{
        return await listDb.getUserLists(id)
    }catch(e){
        throw e;
    }
};

const createList = async (list: ListInput): Promise<List> => {
    try{
        const newList = new List({
            title: list.title,
            description: list.description,
            albumIds: list.albums,
        });

        return await listDb.createList(newList, list.authorId);
    }catch(e){
        throw e;
    }
}

const deleteList = async (id: number) => {
    try{
        await listDb.deleteList(id);
    }catch(e){
        throw e;
    }
}

export default {
    getLists, 
    createList,
    getUserLists,
    deleteList
}
