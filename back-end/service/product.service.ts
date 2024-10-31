import { Product } from "../model/product";
import productDb from "../repository/product.db";

const getAllProducts = async (): Promise<Product[]> => {
    return productDb.getAllProducts();
}

const getProductById = async ({ id }: { id: number }): Promise<Product | undefined> => {
    const product =  productDb.getProductById({id});
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
}


export default { getAllProducts, getProductById }