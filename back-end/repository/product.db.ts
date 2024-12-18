import { Product } from "../model/product";
import database from "./database";

const products = [

];

const getAllproducts = async (): Promise<Product[]> => {
    try {
        const productsPrisma = await database.product.findMany({
            include: { reviews: true }
        });
        return productsPrisma ? productsPrisma.map((productPrisma : Product) => Product.from(productPrisma)) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getProductById = async ({ id }: { id: number }): Promise<Product | null> => {
    try {
        const productPrisma = await database.lecturer.findUnique({
            where: { id },
            include: {reviews: true },
        });

        return productPrisma ? Product.from(productPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const getProductByName = async (name: string): Promise<Product | null> => {
    try {
        const productPrisma = await database.user.findFirst({
            where: { name }
        });
        return productPrisma ? Product.from(productPrisma) : null;
    } catch (error) {
        console.log(error);
        throw new Error('Database error, See server log for details');
    }
}

const createProduct = async({name,price,description,rating,url} : Product): Promise<Product> => {
    try {
        const ProductPrisma = await database.product.create({
            data: {
                name,
                price,
                description,
                rating,
                url
            }
        });
        return Product.from(ProductPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, See server log for details');
    }
}

export default {
    getAllproducts,
    getProductById,
    getProductByName,
    createProduct
};
