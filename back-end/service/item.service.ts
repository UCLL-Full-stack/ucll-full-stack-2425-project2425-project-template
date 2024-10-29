import itemDb from '../repository/item.db';
import { Item } from '../model/item';
import { ItemInput } from '../types';

const getAllItems = (): Item[] => {
    const items = itemDb.getAll();
    if (!items) {
        throw new Error('No items found');
    }

    return items;
};

const createItem = (item: ItemInput): Item => {
    const createdItem = itemDb.create(new Item(item));
    if (!createdItem) {
        throw new Error('Item could not be created');
    }

    return createdItem;
};

export default {
    getAllItems,
    createItem,
};
