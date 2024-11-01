import database from "../../util/database";
import { Review } from "../model/review";
import { Trip } from "../model/trip";
import { Student } from "../model/student";

const getAllReviews = async (): Promise<Review[]> => {
    const reviewsPrisma = await database.review.findMany({
        include: {
            trip: true,
            student: true
        }
    });
    return reviewsPrisma.map((reviewPrisma) => Review.from(reviewPrisma));
};

const getReviewById = async (reviewId: number): Promise<Review | null> => {
    try {
        const reviewPrisma = await database.review.findUnique({
            where: { id: reviewId },
            include: {
                trip: true,
                student: true
            }
        });
        return reviewPrisma ? Review.from(reviewPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve review. See server log for details.");
    }
};

const createReview = async ({
    comment,
    rating,
    tripId,
    studentId,
}: {
    comment: string;
    rating: number;
    tripId: number;
    studentId: number;
}): Promise<Review> => {
    try {
        const trip = await database.trip.findUnique({
            where: { id: tripId },
        });

        const student = await database.student.findUnique({
            where: { id: studentId },
        });

        if (!trip || !student) {
            throw new Error('Trip or Student not found');
        }

        const reviewPrisma = await database.review.create({
            data: {
                comment,
                rating,
                trip: { connect: { id: tripId } },
                student: { connect: { id: studentId } },
            },
            include: {
                trip: true,
                student: true
            }
        });
        return Review.from(reviewPrisma);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create review. See server log for details.");
    }
};

export default {
    getAllReviews,
    getReviewById,
    createReview,
};
