import reviewService from '../../service/review.service';
import reviewDb from '../../repository/review.db';
import { Review } from '../../model/review';
import { Trip } from '../../model/trip';
import { Student } from '../../model/student';
import { PaymentStatus } from '@prisma/client'; 

let mockReviewDbGetAllReviews: jest.Mock;
let mockReviewDbGetReviewById: jest.Mock;

beforeEach(() => {
    mockReviewDbGetAllReviews = jest.fn();
    mockReviewDbGetReviewById = jest.fn();

    reviewDb.getAllReviews = mockReviewDbGetAllReviews;
    reviewDb.getReviewById = mockReviewDbGetReviewById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('should return all reviews', async () => {
    // Given
    const mockReviews: Review[] = [
        new Review({ 
            id: 1, 
            comment: 'Amazing trip!', 
            rating: 5, 
            trip: new Trip({ id: 1, description: 'Trip to Paris', destination: 'France', startDate: new Date(), endDate: new Date(), price: 100 }), 
            student: new Student({ id: 1, username: 'student1', email: 'student1@example.com', password: 'pass', studentNumber: '123456' }) 
        }),
        new Review({ 
            id: 2, 
            comment: 'Not worth the price.', 
            rating: 2, 
            trip: new Trip({ id: 2, description: 'Trip to London', destination: 'UK', startDate: new Date(), endDate: new Date(), price: 200 }),
            student: new Student({ id: 2, username: 'student2', email: 'student2@example.com', password: 'pass', studentNumber: '654321' }) 
        }),
    ];

    mockReviewDbGetAllReviews.mockResolvedValue(mockReviews);

    // When
    const reviews = await reviewService.getAllReviews();

    // Then
    expect(reviews).toEqual(mockReviews);
    expect(mockReviewDbGetAllReviews).toHaveBeenCalled();
});

test('should return a review by ID', async () => {
    // Given
    const reviewId = 1;
    const mockReview: Review = new Review({ 
        id: reviewId, 
        comment: 'Amazing trip!', 
        rating: 5, 
        trip: new Trip({ id: 1, description: 'Trip to Paris', destination: 'France', startDate: new Date(), endDate: new Date(), price: 100 }), 
        student: new Student({ id: 1, username: 'student1', email: 'student1@example.com', password: 'pass', studentNumber: '123456' }) 
    });

    mockReviewDbGetReviewById.mockResolvedValue(mockReview);

    // When
    const review = await reviewService.getReviewById(reviewId);

    // Then
    expect(review).toEqual(mockReview);
    expect(mockReviewDbGetReviewById).toHaveBeenCalledWith(reviewId);
});

test('should throw an error if review ID does not exist', async () => {
    // Given
    const reviewId = 999; 
    mockReviewDbGetReviewById.mockResolvedValue(null);

    // When & Then
    await expect(reviewService.getReviewById(reviewId)).rejects.toThrow(`Review with ID ${reviewId} does not exist.`);
});

test('should throw an error if review ID is invalid', async () => {
    // Given
    const invalidReviewId = -1;

    // When & Then
    await expect(reviewService.getReviewById(invalidReviewId)).rejects.toThrow("Invalid Review ID");
});
