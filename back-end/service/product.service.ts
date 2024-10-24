import { Product } from "../model/product";
import productDb from "../repository/product.db";

const getAllProducts = async (): Promise<Product[]> => {
    console.log(productDb.getAllProducts());
    return productDb.getAllProducts();
}

const getProductByName = async (name: string): Promise<Product | null> => {
    return productDb.getProductByName(name);
}

export default {
    getAllProducts,
    getProductByName
};