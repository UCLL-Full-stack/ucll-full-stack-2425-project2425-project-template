import reviewRepository from '../repository/review.db';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const addReview = async (data: { text: string; rating: number; userId: number; movieId: number }) => {
    return await reviewRepository.createReview(data);
};

const getReview = async (id: string) => {
    return await prisma.review.findUnique({ where: { id: Number(id) } });
};



export default { addReview, getReview };
