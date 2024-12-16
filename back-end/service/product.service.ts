import { Product } from "../model/product";
import productDb from "../repository/product.db";

const getAllProducts = async (): Promise<Product[]> => productDb.getAllproducts();

//const getProductById = ({id}: {id:number}): Product => {
//    const product = productDb.getProductById({id:id});
//    if (!product) {
//        throw new Error(`Product with id ${id} does not exist.`)
//    }
//    return product;
//}

export default { getAllProducts };
