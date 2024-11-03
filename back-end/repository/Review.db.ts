import database from "../util/database";
import { Review } from "../model/Review";

const getAllReviews = async (): Promise<Review[]> => {
    const reviewPrisma = await database.review.findMany({
        include: {
            writer: true,
            recipe: true,
        },
    });

    if (!reviewPrisma || reviewPrisma.length === 0) {
        return [];
    }

    return reviewPrisma.map((reviewPrisma) => Review.from(reviewPrisma));
}

const getReviewById = async (id: number): Promise<Review | null> => {
    const reviewPrisma = await database.review.findUnique({
        where: {
            id: id,
        },
    });

    if (!reviewPrisma) {
        return null;
    }

    return Review.from(reviewPrisma);
}

const createReview = async (review: Review): Promise<Review> => {
    const reviewPrisma = await database.review.create({
        data: {
            text: review.text,
            score: review.score,
            writerId: review.writer.id!,
            recipeId: review.recipe.id!,
        },
        include: {
            writer: true,
            recipe: true,
        },
    });

    return Review.from(reviewPrisma);
}

export default {
    getAllReviews,
    getReviewById,
    createReview,
};