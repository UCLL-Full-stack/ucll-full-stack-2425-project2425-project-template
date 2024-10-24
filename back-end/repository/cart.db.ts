import { Cart } from "../model/cart";

const carts: Cart[] = [
    new Cart({
        id: 1,
        totalPrice: 30,
        customerId: 1,
    })
];

const getCartByCustomerId = (customerId: number): Cart | null => {
    return carts.find((cart) => cart.getCustomerId() === customerId) || null;
}

export default {
    getCartByCustomerId
};