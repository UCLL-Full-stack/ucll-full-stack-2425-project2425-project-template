import { Item } from '../model/item';

const items = [
    new Item({ name: 'Banana', price: 10, pathToImage: 'public/banana.png', category: 'fruits' }),
    new Item({ name: 'Apple', price: 20, pathToImage: 'public/apple.png', category: 'fruits' }),
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

export default {
    getAll,
    create,
};
