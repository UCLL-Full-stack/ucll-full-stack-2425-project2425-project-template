import { List } from "../model/list";
import database from "../util/database";

const getAllLists = async (): Promise<List[]> => {
    try{
        const listsPrisma = await database.list.findMany({
            include: {
                author: true
            }
        });
        return listsPrisma.map((list) => List.from(list))??[];
    }catch(e){
        throw new Error('db Error');
    }
};

const getUserLists = async (authorId: number): Promise<List[]> => {
    try{
        const listsPrisma = await database.list.findMany({
            where: {authorId},
            include: {
                author: true
            }
        });
        if(!listsPrisma) return [];
        return listsPrisma.map((list) => List.from(list));
    }catch(e){
        throw new Error('db Error');
    }
};

const createList = async (list: List, authorId: number): Promise<List> => {
    try{
        const listPrisma = await database.list.create({
            data:{
                title: list.getTitle(), 
                description: list.getDescription(),
                albumIds: list.getAlbums(),
                author: {
                    connect: {id: authorId}
                }
            },
            include:{
                author: true,
            }
        })
        return List.from(listPrisma);
    }catch(e){
        console.log(e);
        throw e;
    }
}

const deleteList = async (id: number)=>{
    try{
        await database.list.delete({
            where: {id}
        })
    }catch(e){

    }
}

export default {
    getAllLists,
    createList,
    getUserLists,
    deleteList
}
