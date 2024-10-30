import { Item } from '../model/item';
import { Shoppingcart } from '../model/shoppingcart';

const shoppingcarts = [
    new Shoppingcart({ id: 0, name: 'Shoppingcart 1', deliveryDate: new Date('2026-12-24') }),
    new Shoppingcart({ id: 1, name: 'Shoppingcart 2', deliveryDate: new Date('2026-9-16') }),
];

const addItemToShoppingcart = ({
    item,
    shoppingcart,
}: {
    item: Item;
    shoppingcart: Shoppingcart;
}) => {
    try {
        shoppingcart.addItem(item);
    } catch (error) {
        console.log(error);
        throw new Error('Could not add item to shoppingcart');
    }
};

const getAll = (): Shoppingcart[] => {
    try {
        return shoppingcarts;
    } catch (error) {
        console.log(error);
        throw new Error('Could not get all shoppingcarts');
    }
};

const getById = (id: number): Shoppingcart | undefined => {
    try {
        return shoppingcarts.find((shoppingcart) => shoppingcart.getId() === id);
    } catch (error) {
        console.log(error);
        throw new Error('Could not get item by id');
    }
};

const create = (shoppingcart: Shoppingcart): Shoppingcart => {
    try {
        if (shoppingcarts.includes(shoppingcart)) {
            throw new Error('Shoppingcart already exists');
        }
        shoppingcarts.push(shoppingcart);
        return shoppingcart;
    } catch (error) {
        console.log(error);
        throw new Error('Could not create shoppingcart');
    }
};

export default {
    getAll,
    getById,
    addItemToShoppingcart,
    create,
};
