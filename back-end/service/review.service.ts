import { Review } from "../domain/model/review";

export class ReviewRepository {
    private reviews: Review[] = [];

    async getReviewsByStudentId(studentId: number): Promise<Review[]> {
        return this.reviews.filter(review => review.getStudent().getId() === studentId);
    }

    async getReviewsByBookingId(bookingId: number): Promise<Review[]> {
        return this.reviews.filter(review => review.getBooking().getId() === bookingId);
    }

    async addReview(review: Review): Promise<Review> {
        this.reviews.push(review);
        return review;
    }

    async getReviewById(id: number): Promise<Review | undefined> {
        return this.reviews.find(review => review.getId() === id);
    }

    async deleteReviewById(id: number): Promise<void> {
        this.reviews = this.reviews.filter(review => review.getId() !== id);
    }

    async getReviewByRating(rating: number): Promise<Review[]> {
        return this.reviews.filter(review => review.getRating() === rating);
    }
}