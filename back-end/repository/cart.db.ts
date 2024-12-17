import { Cart } from "../model/cart";
import database from "./database";

const getAllCarts = async (): Promise<Cart[]> => {
    try {
        const cartsPrisma = await database.cart.findMany({
            include: {
                products: true,
                user: true,
            },
        });
        return cartsPrisma.map(cartPrisma => Cart.from(cartPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getCartById = async (id: number): Promise<Cart | null> => {
    try {
        const cartPrisma = await database.cart.findUnique({
            where: { id },
            include: {
                products: true,
                user: true,
            },
        });
        if (!cartPrisma) {
            return null;
        }
        return Cart.from(cartPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const putProductToCart = async (cartId: number, productId: number): Promise<Cart | string> => {
    try {
        const cart = await database.cart.findUnique({
            where: { id: cartId },
            include: { products: true, user: true },
        });

        if (!cart) {
            return `Cart with ID ${cartId} not found`;
        }

        const product = await database.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return "Product not found in the available products list.";
        }

        const updatedCart = await database.cart.update({
            where: { id: cartId },
            data: {
                products: {
                    connect: { id: productId },
                },
            },
            include: {
                products: true,
                user: true,
            },
        });

        return Cart.from(updatedCart);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllCarts,
    putProductToCart,
    getCartById
};
