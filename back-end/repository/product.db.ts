import { PrismaClient } from '@prisma/client';
import { Product } from '../domain/Product';

const prisma = new PrismaClient();

const getAll = async (): Promise<Product[]> => {
    const products = await prisma.product.findMany();
    console.log(products);
    return products.map(Product.from); // Map Prisma results to domain objects
};

export default {
    getAll,
};
