import { Cart } from "../model/cart";
import { Product } from "../model/product";
import cartDb from "../repository/cart.db";
import productDb from "../repository/product.db";

const getAllCarts = (): Cart[] => {
    return cartDb.getAllCarts();
};

const putProductInCart = ({ id, productId }: { id: number; productId: number }): Cart | string => {

    const allProducts = productDb.getAllproducts();
    const allCarts = getAllCarts();
    const existingProduct = allProducts.find(p => p.getId() === productId);
    const cart = allCarts.find(c => c.getId() === id);
    
        if (!cart) {
            return `Cart with ID ${id} not found`;
        }

    if (!existingProduct) {
        return "Product not found in the available products list.";
    }

    // Proceed to add the product to the cart if it exist
    return cartDb.putProductToCart(id, existingProduct);
};

export default { getAllCarts,putProductInCart };
