import { Product } from "../model/product";
import productDb from "../repository/product.db";

const getAllProducts = async (): Promise<Product[]> => {
    return productDb.getAllProducts();
}


export default { getAllProducts }