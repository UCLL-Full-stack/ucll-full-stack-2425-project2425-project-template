import shoppingcartDb from '../repository/shoppingcart.db';
import { Shoppingcart } from '../model/shoppingcart';

const getAllShoppingcarts = (): Shoppingcart[] => {
    const shoppingcarts = shoppingcartDb.getAll();
    if (!shoppingcarts) {
        throw new Error('No shoppingcarts found');
    }

    return shoppingcarts;
};

export default { getAllShoppingcarts };
