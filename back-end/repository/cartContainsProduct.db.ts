import { Product } from "../model/product";
import { CartContainsProduct } from "../types";

const cartContainsProduct: CartContainsProduct[] = [
    { cartId: 1, productName: "Bread" },
    { cartId: 1, productName: "Salt" },
    { cartId: 1, productName: "Sugar" },
];

const getCartItemNamesByCartId = (id: number): string[] => {
    const itemNames: string[] = [];
    for (let item of cartContainsProduct) {
        if (item.cartId === id) itemNames.push(item.productName);
    }
    return itemNames;
};

const deleteCartItemByCartIdAndProductName = (cartId: number, name: string): string => {
    for (let i = 0; i < cartContainsProduct.length; i++) {
        if (cartContainsProduct[i].productName === name && cartContainsProduct[i].cartId === cartId) {
            cartContainsProduct.splice(i, 1);
            return "Successfully deleted item from cart.";
        }
    }
    return "Item not in cart."
};

// const getProductsByCartId = (cartId: number): Product[] {
//     const products: Product[] = [];
//     for (let cartProduct of cartContainsProduct) {
//         if (cartProduct.cartId === cartId) {

//             products.push(cartProduct.productName);
//         }
//     };
// };

export default {
    getCartItemNamesByCartId,
    deleteCartItemByCartIdAndProductName
}