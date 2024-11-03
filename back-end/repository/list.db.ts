import { List } from "../model/list";

const lists: List[] = [
]

const getAllLists = (): List[] => {
    return lists
};

const createList = (list: List): List => {
    const newList = new List({
        id: lists.length,
        title: list.getTitle(),
        description: list.getDescription(),
        albums: list.getAlbums()
    });
    lists.push(newList);
    return newList;
}

export default {
    getAllLists,
    createList
}
