import { Review } from "../model/review";
import { Trip } from "../model/trip";
import { Student } from "../model/student";
import database from "../util/database";

const getAllReviews = async (): Promise<Review[]> => {
    const reviewsPrisma = await database.review.findMany({
        include: {
            trip: true,
            student: {
                include: { user: true }
            }        }
    });
    return reviewsPrisma.map((reviewPrisma) => Review.from(reviewPrisma));
};

const getReviewById = async (reviewId: number): Promise<Review | null> => {
    try {
        const reviewPrisma = await database.review.findUnique({
            where: { id: reviewId },
            include: {
                trip: true,
                student: {
                    include: { user: true }
                }            }
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
                student: {
                    include: { user: true }
                }            }
        });
        return Review.from(reviewPrisma);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create review. See server log for details.");
    }
};
const getReviewForStudent = async ({ username }: { username: string }): Promise<Review[]> => {
    try {
        const reviewsPrisma = await database.review.findMany({
            where: {
                student: {
                    user: {
                        username: username, 
                    },
                },
            },
            include: {
                trip: true,
                student: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return reviewsPrisma.map((reviewPrisma) => Review.from(reviewPrisma));
    } catch (error) {
        console.error('Error fetching reviews for student:', username, error);
        throw new Error(`Unable to retrieve reviews for student with username: ${username}. Please try again later.`);
    }
};
const updateReviewForStudent = async ({
    review,
}: {
    review: Review;
}): Promise<Review | null> => {
    const reviewId = review.getId();  
    const comment = review.getComment();  
    const rating = review.getRating();  
    const trip = review.getTrip(); 

    if (!reviewId) {
        throw new Error('Review ID is required for updating the review.');
    }

    if (!comment || comment.trim().length === 0) {
        throw new Error('Review comment is required.');
    }

    if (rating < 1 || rating > 5) {
        throw new Error('Rating must be between 1 and 5.');
    }

    try {
        const updatedReviewPrisma = await database.review.update({
            where: { id: reviewId },
            data: {
                comment,  
                rating,   
                trip: { connect: { id: trip.getId() } },
            },
            include: {
                trip: true,
                student: { include: { user: true } },
            },
        });

        return updatedReviewPrisma ? Review.from(updatedReviewPrisma) : null;
    } catch (error) {
        console.error('Error updating review for student:', reviewId, error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllReviews,
    getReviewById,
    createReview,
    getReviewForStudent,
    updateReviewForStudent,
};
