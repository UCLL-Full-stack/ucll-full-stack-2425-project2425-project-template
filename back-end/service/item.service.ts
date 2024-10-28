import itemDb from '../repository/item.db';
import { Item } from '../model/item';

const getAllItems = (): Item[] => {
    const items = itemDb.getAll();
    if (!items) {
        throw new Error('No items found');
    }

    return items;
};

export default {
    getAllItems,
};
