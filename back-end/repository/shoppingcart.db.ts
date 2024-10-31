import { Shoppingcart } from "../model/shoppingcart";
import productService from "../service/product.service";
import productDb from "./product.db";


const shoppingCarts = [
new Shoppingcart({
    id: 1,
    products: [],
    totalPrice: 0
})]

const product1 = productDb.getProductById({id: 1});
const product2 = productDb.getProductById({id: 2});

if(product1){
    shoppingCarts[0].addProductToShoppingCart(product1);    
};
if(product2){
    shoppingCarts[0].addProductToShoppingCart(product2);
}

const getShoppingCartById = async ({ id }: { id: number }): Promise<Shoppingcart | undefined> => {
    try {
        return shoppingCarts.find(shoppingCart => shoppingCart.getId() === id) || undefined;
    }catch(error){
        throw new Error('Shoppingcart not found');
    }
}

export default { getShoppingCartById }