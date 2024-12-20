import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createReview = async (data: { text: string; rating: number; userId: number; movieId: number }) => {
  return await prisma.review.create({ data });
  
};

export default { createReview };
