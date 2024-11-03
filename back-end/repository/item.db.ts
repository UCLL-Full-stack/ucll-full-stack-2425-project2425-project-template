import { Item } from '../model/item';
import { Nutritionlabel } from '../model/nutritionlabel';

const items = [
    new Item({
        id: 0,
        name: 'Banana',
        price: 10,
        pathToImage:
            'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg',
        category: 'fruits',
    }),
    new Item({
        id: 1,
        name: 'Apple',
        price: 20,
        pathToImage:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS_Db0jJvWe6vYScLksI8qoM2WCeHfJnSBVw&s',
        category: 'fruits',
    }),
];

const getAll = (): Item[] => {
    try {
        return items;
    } catch (error) {
        console.log(error);
        throw new Error('Could not get all items');
    }
};

const create = (item: Item): Item => {
    try {
        item.setId(items.length);

        const exists = items.find((existingItem) => existingItem.getId() === item.getId());

        if (exists) {
            throw new Error('Item already exists');
        }

        items.push(item);
        return item;
    } catch (error) {
        console.error('Error creating item:', error);
        throw new Error('Could not create item');
    }
};

const getById = (id: number): Item | undefined => {
    try {
        return items.find((item) => item.getId() === id);
    } catch (error) {
        console.log(error);
        throw new Error('Could not get item by id');
    }
};

const addNutritionlabel = (item: Item, nutritionlabel: Nutritionlabel): Item => {
    try {
        item.setNutritionLabel(nutritionlabel);
        return item;
    } catch (error) {
        console.log(error);
        throw new Error('Could not add nutritionlabel to item');
    }
};

export default {
    getAll,
    create,
    getById,
    addNutritionlabel,
};
