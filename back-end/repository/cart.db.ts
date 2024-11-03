import { Cart } from "../model/cart";
import { Product } from "../model/product"; // Import your Product model

const carts: Cart[] = [    
    new Cart({
        id: 1,
        products: [],
    }),
];

const getAllCarts = (): Cart[] => {
    return carts;
};

const putProductToCart = (cartId: number, product: Product): Cart | string => {
    const cart = carts.find(c => c.getId() === cartId);
    
    if (!cart) {
        return `Cart with ID ${cartId} not found`;
    }
    
    // Add the product to the cart's products array
    cart.getProducts().push(product);
    
    // Optionally, you can recalculate the total price if needed
    // This assumes you want to maintain the total price in the cart class itself
    (cart as any).totalPrice = cart.getProducts().reduce((total, prod) => total + prod.getPrice(), 0);

    return cart; // Return the updated cart
};

export default {
    getAllCarts,
    putProductToCart,
};
