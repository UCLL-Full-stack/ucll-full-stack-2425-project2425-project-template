import { Product } from "../model/product";
import database from "./database";

const products = [
    new Product({
    id:1,
    name: 'speaker',
    price: 100,
    description: "well made speaker",
    rating: 4,
    }),
    new Product({
        id: 2,
        name: 'mouse',
        price: 200,
        description: "well made mouse",
        rating: 4,
    }),
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
