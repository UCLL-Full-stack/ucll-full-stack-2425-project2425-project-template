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

export default {
    getAll,
};
