import { UnauthorizedError } from "express-jwt";
import { Cart } from "../model/cart";
import { Product } from "../model/product";
import cartDb from "../repository/cart.db";
import productDb from "../repository/product.db";
import userDb from "../repository/user.db";
import { Role } from "../types";

const getAllCarts = async ({ role, email }: { role: Role; email: string }): Promise<Cart[]> => {
    if (role === 'admin') {
        return await cartDb.getAllCarts();
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized',
        });
    }
};

const getCartById = async (id: number): Promise<Cart | null> => {
    return await cartDb.getCartById(id);
};

const addProductToCart = async (email: string, productId: number): Promise<Cart> => {
    const user = await userDb.getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const userId = user.getId();
    if (userId === undefined) {
        throw new Error('User ID is undefined');
    }

    let cart = await cartDb.getCartByUserId(userId);
    if (!cart) {
        cart = new Cart({
            products: [],
            user: user,
        });
        cart = await cartDb.createCart(cart);
    }

    const product = await productDb.getProductById({ id: productId });
    if (!product) {
        throw new Error('Product not found');
    }

    try {
        const updatedCart = await cartDb.putProductToCart(cart.getId()!, productId);
        const newTotalPrice = updatedCart.getProducts().reduce((total, product) => total + product.getPrice(), 0);

        const finalCart = await cartDb.updateCartTotalPrice(updatedCart.getId()!, newTotalPrice);
        return finalCart;
    } catch (error) {
        throw new Error('Failed to add product to cart');
    }
};

const createCart = async (cart: Cart): Promise<Cart> => {
    return await cartDb.createCart(cart);
};

const getCartForUser = async (email: string): Promise<Cart> => {
    const user = await userDb.getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const userId = user.getId();
    if (userId === undefined) {
        throw new Error('User ID is undefined');
    }

    let cart = await cartDb.getCartByUserId(userId);
    if (!cart) {
        cart = new Cart({
            products: [],
            user: user,
        });
        cart = await cartDb.createCart(cart);
    }

    return cart;
};

export default { 
    getAllCarts, 
    getCartById, 
    createCart, 
    addProductToCart, 
    getCartForUser 
};