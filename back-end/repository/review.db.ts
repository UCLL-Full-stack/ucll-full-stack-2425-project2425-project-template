import { PrismaClient } from '@prisma/client';
import { Review } from '../model/review'; 

const prisma = new PrismaClient();

const createReviewForProduct = async (productId: number, reviewData: Review): Promise<Review> => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            throw new Error('Product not found');
        }

        const review = await prisma.review.create({
            data: {
                score: reviewData.getScore(),
                comment: reviewData.getComment(),
                date: reviewData.getDate(),
                product: {
                    connect: { id: productId }, 
                },
            },
        });

        return review;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Failed to create review: ' + error.message);
        } else {
            throw new Error('Unknown error occurred');
        }
    }
};

export default { createReviewForProduct };
