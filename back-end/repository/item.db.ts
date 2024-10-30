import { Item } from '../model/item';

const items = [
    new Item({
        name: 'Banana',
        price: 10,
        pathToImage:
            'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg',
        category: 'fruits',
    }),
    new Item({
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
        if (items.includes(item)) {
            throw new Error('Item already exists');
        }
        items.push(item);
        return item;
    } catch (error) {
        console.log(error);
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

export default {
    getAll,
    create,
    getById,
};
