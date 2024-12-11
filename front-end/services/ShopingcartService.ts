import { Shoppingcart } from '@types';

const addShoppingcart = async (shoppingcart: Shoppingcart) => {
    try {
        return fetch(process.env.NEXT_PUBLIC_API_URL + '/shoppingcarts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(shoppingcart),
        });
    } catch (error) {
        console.error(error);
    }
};

const ShoppingcartService = {
    addShoppingcart,
};

export default ShoppingcartService;
