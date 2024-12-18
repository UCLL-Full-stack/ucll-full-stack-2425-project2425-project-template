import { UnauthorizedError } from "express-jwt";
import { Cart } from "../model/cart";
import { Product } from "../model/product";
import cartDb from "../repository/cart.db";
import productDb from "../repository/product.db";
import { Role } from "../types";

const getAllCarts = async ({role,email}: {role: Role; email: string}): Promise<Cart[]> => {
    if(role === 'admin'){
        return await cartDb.getAllCarts();
    }else{
        throw new UnauthorizedError('credentials_required',{
            message: 'You are not authorized',
        });
    }
};

const getCartById = async (id: number): Promise<Cart | null> => {
    return await cartDb.getCartById(id);
};

// const putProductInCart = async ({ id, productId }: { id: number; productId: number }): Promise<Cart | string> => {

//     const allProducts = await productDb.getAllproducts();
//     const allCarts = await getAllCarts();
//     const existingProduct = allProducts.find(p => p.getId() === productId);
//     const cart = allCarts.find(c => c.getId() === id);
    
//         if (!cart) {
//             return `Cart with ID ${id} not found`;
//         }

//     if (!existingProduct) {
//         return "Product not found in the available products list.";
//     }

//     // Proceed to add the product to the cart if it exist
//     return await cartDb.putProductToCart(id, productId);
// };

const createCart = async (cart: Cart): Promise<Cart> => {
    return await cartDb.createCart(cart);
};

export default { getAllCarts, getCartById, createCart };
