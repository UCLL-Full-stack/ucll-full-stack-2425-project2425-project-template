import { Shoppingcart } from "../model/shoppingcart";
import productService from "../service/product.service";
import productDb from "./product.db";


const shoppingCarts = [
new Shoppingcart({
    id: 1,
    products: productDb.products.slice(0, 3),
    totalPrice: productDb.products.slice(0, 3).reduce((acc, product) => acc + product.getPrice(), 0)
})]

const getShoppingCartById = async ({ id }: { id: number }): Promise<Shoppingcart | undefined> => {
    try {
        return shoppingCarts.find(shoppingCart => shoppingCart.getId() === id) || undefined;
    }catch(error){
        throw new Error('Shoppingcart not found');
    }
}

export default { getShoppingCartById }