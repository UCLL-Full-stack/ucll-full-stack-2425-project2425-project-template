import shoppingcartDb from '../repository/shoppingcart.db';
import { Shoppingcart } from '../model/shoppingcart';
import itemService from './item.service';
import itemDb from '../repository/item.db';

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

export default { getAllShoppingcarts, addItemToShoppingcart };
