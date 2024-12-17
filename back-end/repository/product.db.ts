import { Product } from "../model/product";
import database from "./database";

const products = [

];

const getAllproducts = async (): Promise<Product[]> => {
    try {
        const productsPrisma = await database.product.findMany({
            include: { reviews: true }
        });
        return productsPrisma.map((productPrisma) => Product.from(productPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

//const getProductById = ({id}: {id:number}):Product | null => {
//    const product = products.find((aProduct) => aProduct.getId() === id);
//   if (!product) {
//        return null;
//    }
//    return product;
//}

export default {
    getAllproducts,
    //getProductById
};
