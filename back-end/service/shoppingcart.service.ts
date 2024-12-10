import shoppingcartDb from '../repository/shoppingcart.db';
import { Shoppingcart } from '../model/shoppingcart';
import itemDb from '../repository/item.db';
import { ShoppingcartInput } from '../types';
import { User } from '../model/user';

const getAllShoppingcarts = async (): Promise<Shoppingcart[]> => {
    const shoppingcarts = await shoppingcartDb.getAll();
    if (!shoppingcarts) {
        throw new Error('No shoppingcarts found');
    }

    return shoppingcarts;
};

const addItemToShoppingcart = async ({
    itemId,
    shoppingcartId,
}: {
    itemId: number;
    shoppingcartId: number;
}): Promise<Shoppingcart> => {
    const item = await itemDb.getById(itemId);
    const shoppingcart = await shoppingcartDb.getById(shoppingcartId);

    if (!item || item === undefined || !shoppingcart || shoppingcart === undefined) {
        throw new Error('Item or shoppingcart not found');
    }

    await shoppingcartDb.addItemToShoppingcart({ item, shoppingcart });

    return shoppingcart;
};

const createShoppingcart = async (shoppingcart: ShoppingcartInput): Promise<Shoppingcart> => {
    const newShoppingcart = new Shoppingcart(shoppingcart);

    // temp user
    const tempUser = new User({
        id: 0,
        email: 'john@mail.com',
        password: 'john123!',
        role: 'admin',
    });

    newShoppingcart.setUser(tempUser);

    const createdShoppingcart = await shoppingcartDb.create(newShoppingcart);

    if (!createdShoppingcart) {
        throw new Error('Could not create shoppingcart');
    }

    return createdShoppingcart;
};

export default { getAllShoppingcarts, addItemToShoppingcart, createShoppingcart };
