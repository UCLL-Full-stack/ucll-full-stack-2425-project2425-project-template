import { Cart } from "../model/cart";
import { Product } from "../model/product";
import cartDb from "../repository/cart.db";
import productDb from "../repository/product.db";

const getAllCarts = async (): Promise<Cart[]> => {
    return await cartDb.getAllCarts();
};

const getCartById = async (id: number): Promise<Cart | null> => {
    return await cartDb.getCartById(id);
};

const putProductInCart = async ({ id, productId }: { id: number; productId: number }): Promise<Cart | string> => {

    const allProducts = await productDb.getAllproducts();
    const allCarts = await getAllCarts();
    const existingProduct = allProducts.find(p => p.getId() === productId);
    const cart = allCarts.find(c => c.getId() === id);
    
        if (!cart) {
            return `Cart with ID ${id} not found`;
        }

    if (!existingProduct) {
        return "Product not found in the available products list.";
    }

    // Proceed to add the product to the cart if it exist
    return await cartDb.putProductToCart(id, productId);
};

export default { getAllCarts, putProductInCart, getCartById };
