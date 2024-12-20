import { Cart } from "../model/cart";
import database from "./database";

const getAllCarts = async (): Promise<Cart[]> => {
    try {
        const cartsPrisma = await database.cart.findMany({
            include: {
                user: true,
                products: {
                    include: {
                        product: true
                    }
                },
            },
        });
        return cartsPrisma.map((cartPrisma) => Cart.from(cartPrisma));
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
                user: true,
                products: {
                    include: {
                        product: true
                    }
                },
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

const getCartByUserId = async (userId: number): Promise<Cart | null> => {
    try {
        const cartPrisma = await database.cart.findUnique({
            where: { userId },
            include: {
                user: true,
                products: {
                    include: {
                        product: true
                    }
                },
            },
        });
        return cartPrisma ? Cart.from(cartPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const putProductToCart = async (cartId: number, productId: number): Promise<Cart> => {
    try {
        const cart = await database.cart.findUnique({
            where: { id: cartId },
            include: {
                products: {
                    include: {
                        product: true
                    }
                },
                user: true,
            },
        });

        if (!cart) {
            throw new Error(`Cart with ID ${cartId} not found`);
        }

        const product = await database.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            throw new Error("Product not found in the available products list.");
        }

        const updatedCart = await database.cart.update({
            where: { id: cartId },
            data: {
                products: {
                    create: { product: { connect: { id: productId } } },
                },
            },
            include: {
                user: true,
                products: {
                    include: {
                        product: true
                    }
                },
            },
        });

        return Cart.from(updatedCart);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateCartTotalPrice = async (cartId: number, totalPrice: number): Promise<Cart> => {
    try {
        const updatedCart = await database.cart.update({
            where: { id: cartId },
            data: { totalPrice },
            include: {
                user: true,
                products: {
                    include: {
                        product: true
                    }
                },
            },
        });
        return Cart.from(updatedCart);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createCart = async ({ products, user, totalPrice }: Cart): Promise<Cart> => {
    try {
        const userId = user.getId();

        if (userId === undefined || products.some(product => product.getId() === undefined)) {
            throw new Error('Invalid userId or productId');
        }

        const newCart = await database.cart.create({
            data: {
                userId,
                products: {
                    create: products.map(product => ({ product: { connect: { id: product.getId() } } })),
                },
                totalPrice,
            },
            include: {
                user: true,
                products: {
                    include: {
                        product: true
                    }
                },
            },
        });
        return Cart.from(newCart);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const clearCartProducts = async (cartId: number): Promise<void> => {
    try {
        await database.cart.update({
            where: { id: cartId },
            data: {
                products: {
                    set: [],
                },
                totalPrice: 0,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const removeProductFromCart = async (cartId: number, productId: number): Promise<Cart> => {
    try {
        const cartProduct = await database.cartProducts.findFirst({
            where: { cartId, productId },
        });

        if (!cartProduct) {
            throw new Error('Product not found in cart');
        }

        await database.cartProducts.delete({
            where: { id: cartProduct.id },
        });

        const updatedCart = await database.cart.findUnique({
            where: { id: cartId },
            include: {
                user: true,
                products: {
                    include: {
                        product: true,
                    },
                },
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
    getCartById,
    createCart,
    getCartByUserId,
    updateCartTotalPrice,
    clearCartProducts,
    removeProductFromCart,
};