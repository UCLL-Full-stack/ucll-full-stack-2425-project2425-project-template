import shoppingcartDb from '../repository/shoppingcart.db';
import { Shoppingcart } from '../model/shoppingcart';
import itemService from './item.service';
import itemDb from '../repository/item.db';
import { ShoppingcartInput } from '../types';

const getAllShoppingcarts = (): Shoppingcart[] => {
    const shoppingcarts = shoppingcartDb.getAll();
    if (!shoppingcarts) {
        throw new Error('No shoppingcarts found');
    }

    return shoppingcarts;
};

const addItemToShoppingcart = ({
    itemId,
    shoppingcartId,
}: {
    itemId: number;
    shoppingcartId: number;
}): Shoppingcart => {
    const item = itemDb.getById(itemId);
    const shoppingcart = shoppingcartDb.getById(shoppingcartId);

    if (!item || item === undefined || !shoppingcart || shoppingcart === undefined) {
        throw new Error('Item or shoppingcart not found');
    }

    shoppingcartDb.addItemToShoppingcart({ item, shoppingcart });

    return shoppingcart;
};

const createShoppingcart = (shoppingcart: ShoppingcartInput): Shoppingcart => {
    const newShoppingcart = new Shoppingcart(shoppingcart);

    const createdShoppingcart = shoppingcartDb.create(newShoppingcart);

    if (!createdShoppingcart) {
        throw new Error('Could not create shoppingcart');
    }

    return createdShoppingcart;
};

export default { getAllShoppingcarts, addItemToShoppingcart, createShoppingcart };
