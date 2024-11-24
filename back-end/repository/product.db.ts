import { PrismaClient, Product as PrismaProduct, Review as PrismaReview } from '@prisma/client';
import { Product } from "../model/product";
import { Review } from "../model/review";

const prisma = new PrismaClient();

const getProductById = async ({ id }: { id: number }): Promise<Product | null> => {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: { reviews: true },  
        });
        
        if (!product) return null;
        
        return product
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllProducts = async (): Promise<Product[]> => {
    try {
        const productsPrisma = await prisma.product.findMany({
            include: { reviews: true },  
        });
        
        return productsPrisma.map((productsPrisma)=> Product.from(productsPrisma))
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createProduct = async (product: Product): Promise<Product> => {
    try {
        const createdProduct = await prisma.product.create({
            data: {
                name: product.getName(),
                price: product.getPrice(),
                description: product.getDescription(),
                stock: product.getStock(),
            },
        });

        return createdProduct
    } catch (error) {
        console.error(error);
        throw new Error('Failed to create product');
    }
}

const getReviewsForProduct = async ({ id }: { id: number }): Promise<Review[]> => {
    try {
        const product = await getProductById({ id });
        if (!product) {
            throw new Error('Product not found');
        }
        return product.getReviews();
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching reviews');
    }
}

export default { getAllProducts, getProductById, createProduct, getReviewsForProduct };
