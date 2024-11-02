import { PaymentStatus } from '@prisma/client';
import tripDb from '../../domain/data-access/trip.db';
import studentDb from '../../domain/data-access/student.db';
import { Review } from '../../domain/model/review';
import reviewDb from '../../domain/data-access/review.db';
import reviewService from '../../service/review.service';

let createReviewMock: jest.Mock;
let mockTripDbGetTripById: jest.Mock;
let mockStudentDbGetStudentById: jest.Mock;
let mockReviewDbCreateReview: jest.Mock;
let mockReviewDbGetAllReviews: jest.Mock;
let mockReviewDbGetReviewById: jest.Mock;

beforeEach(() => {
    mockTripDbGetTripById = jest.fn();
    mockStudentDbGetStudentById = jest.fn();
    mockReviewDbCreateReview = jest.fn();
    mockReviewDbGetAllReviews = jest.fn();
    mockReviewDbGetReviewById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});



test('given an invalid review comment, when createReview is called, then an error is thrown', async () => {
    // Given
    const invalidReviewInput = { ...validReviewInput, comment: '' };

    // When
    const createReview = async () => await reviewService.createReview(invalidReviewInput);

    // Then
    await expect(createReview()).rejects.toThrow('Comment is required.');
});

test('given an invalid rating, when createReview is called, then an error is thrown', async () => {
    // Given
    const invalidReviewInput = { ...validReviewInput, rating: 6 };

    // When
    const createReview = async () => await reviewService.createReview(invalidReviewInput);

    // Then
    await expect(createReview()).rejects.toThrow('Rating must be between 1 and 5.');
});

test('given a review input with a non-existent trip ID, when createReview is called, then an error is thrown', async () => {
    // Given
    tripDb.getTripById = mockTripDbGetTripById.mockReturnValue(Promise.resolve(null));
    
    // When
    const createReview = async () => await reviewService.createReview(validReviewInput);

    // Then
    await expect(createReview()).rejects.toThrow(`Trip with ID ${validReviewInput.tripId} does not exist.`);
});

test('given a review input with a non-existent student ID, when createReview is called, then an error is thrown', async () => {
    // Given
    studentDb.getStudentById = mockStudentDbGetStudentById.mockReturnValue(Promise.resolve(null));

    // When
    const createReview = async () => await reviewService.createReview(validReviewInput);

    // Then
    await expect(createReview()).rejects.toThrow(`Student with ID ${validReviewInput.studentId} does not exist.`);
});

test('given an error when creating a review in the database, when createReview is called, then an error is thrown', async () => {
    // Given
    tripDb.getTripById = mockTripDbGetTripById.mockReturnValue(Promise.resolve(trip));
    studentDb.getStudentById = mockStudentDbGetStudentById.mockReturnValue(Promise.resolve(student));
    reviewDb.createReview = mockReviewDbCreateReview.mockImplementation(() => {
        throw new Error('Database error');
    });

    // When
    const createReview = async () => await reviewService.createReview(validReviewInput);

    // Then
    await expect(createReview()).rejects.toThrow('Review creation failed due to a database error.');
});

test('when getAllReviews is called, then it retrieves all reviews', async () => {
    // Given
    const reviews = [new Review(validReviewInput)];
    reviewDb.getAllReviews = mockReviewDbGetAllReviews.mockReturnValue(Promise.resolve(reviews));

    // When
    const result = await reviewService.getAllReviews();

    // Then
    expect(mockReviewDbGetAllReviews).toHaveBeenCalled();
    expect(result).toEqual(reviews);
});

test('given an invalid review ID, when getReviewById is called, then an error is thrown', async () => {
    // When
    const getReview = async () => await reviewService.getReviewById(-1);

    // Then
    await expect(getReview()).rejects.toThrow("Invalid Review ID");
});

test('given a non-existent review ID, when getReviewById is called, then an error is thrown', async () => {
    // Given
    mockReviewDbGetReviewById.mockReturnValue(Promise.resolve(null));

    // When
    const getReview = async () => await reviewService.getReviewById(1);

    // Then
    await expect(getReview()).rejects.toThrow(`Review with ID 1 does not exist.`);
});

test('when getReviewById is called with a valid ID, it returns the review', async () => {
    // Given
    const review = new Review(validReviewInput);
    mockReviewDbGetReviewById.mockReturnValue(Promise.resolve(review));

    // When
    const result = await reviewService.getReviewById(1);

    // Then
    expect(result).toEqual(review);
});
