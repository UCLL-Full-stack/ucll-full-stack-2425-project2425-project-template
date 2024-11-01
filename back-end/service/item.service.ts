import itemDb from '../repository/item.db';
import { Item } from '../model/item';
import { ItemInput, NutritionlabelInput } from '../types';
import { Nutritionlabel } from '../model/nutritionlabel';
import nutritionlabelDb from '../repository/nutritionlabel.db';

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

const addNutritionLabelToItem = (itemId: number, nutritionlabel: NutritionlabelInput): Item => {
    const item = itemDb.getById(itemId);

    if (!item) {
        throw new Error('Item not found');
    }

    const createdNutritionlabel = nutritionlabelDb.create(new Nutritionlabel(nutritionlabel));

    if (!createdNutritionlabel) {
        throw new Error('Nutritionlabel could not be created');
    }

    return itemDb.addNutritionlabel(item, createdNutritionlabel);
};

export default {
    getAllItems,
    createItem,
    addNutritionLabelToItem,
};
