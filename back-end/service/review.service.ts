import reviewDb from "../domain/data-access/review.db";
import tripDb from "../domain/data-access/trip.db";
import studentDb from "../domain/data-access/student.db";
import { Review } from "../domain/model/review";
import { ReviewInput } from "../types";

const createReview = async (input: ReviewInput): Promise<Review> => {
    const { comment, rating, tripId, studentId } = input;

    if (!comment || comment.trim().length === 0) {
        throw new Error("Comment is required.");
    }

    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5.");
    }

    const trip = await tripDb.getTripById(tripId);
    if (!trip) {
        throw new Error(`Trip with ID ${tripId} does not exist.`);
    }

    const student = await studentDb.getStudentById(studentId);
    if (!student) {
        throw new Error(`Student with ID ${studentId} does not exist.`);
    }

    const newReview = new Review({ comment, rating, trip, student });
    newReview.validate();

    try {
        return await reviewDb.createReview({
            comment,
            rating,
            tripId,
            studentId,
        });
    } catch (error) {
        console.error("Error creating review:", error);
        throw new Error("Review creation failed due to a database error.");
    }
};

const getAllReviews = async (): Promise<Review[]> => {
    try {
        return await reviewDb.getAllReviews();
    } catch (error) {
        console.error("Error fetching all reviews:", error);
        throw new Error("Could not retrieve reviews.");
    }
};

const getReviewById = async (reviewId: number): Promise<Review> => {
    if (typeof reviewId !== 'number' || reviewId <= 0) {
        throw new Error("Invalid Review ID");
    }

    const review = await reviewDb.getReviewById(reviewId);
    if (!review) {
        throw new Error(`Review with ID ${reviewId} does not exist.`);
    }
    return review;
};

export default { createReview, getAllReviews, getReviewById };
