import reviewService from "../../service/review.service";
import { Review } from "../../model/review";
import { Student } from "../../model/student";
import { Trip } from "../../model/trip";
import { User } from "../../model/user";
import reviewDb from "../../repository/review.db";
import studentDb from "../../repository/student.db";
import tripDb from "../../repository/trip.db";

let mockReviewDbGetAllReviews: jest.Mock;
let mockReviewDbGetReviewById: jest.Mock;
let mockReviewDbCreateReview: jest.Mock;
let mockTripDbGetTripById: jest.Mock;
let mockStudentDbGetStudentById: jest.Mock;

beforeEach(() => {
    mockReviewDbGetAllReviews = jest.fn();
    mockReviewDbGetReviewById = jest.fn();
    mockReviewDbCreateReview = jest.fn();
    mockTripDbGetTripById = jest.fn();
    mockStudentDbGetStudentById = jest.fn();

    reviewDb.getAllReviews = mockReviewDbGetAllReviews;
    reviewDb.getReviewById = mockReviewDbGetReviewById;
    reviewDb.createReview = mockReviewDbCreateReview;
    tripDb.getTripById = mockTripDbGetTripById;
    studentDb.getStudentById = mockStudentDbGetStudentById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('should return all reviews', async () => {
    // Given: A mock list of reviews
    const mockReviews: Review[] = [
        new Review({
            id: 1,
            comment: 'Amazing trip!',
            rating: 5,
            trip: new Trip({
                id: 1,
                description: 'Trip to Paris',
                destination: 'France',
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-01-10'),
                price: 100,
            }),
            student: new Student({
                id: 1,
                user: new User({
                    id: 1,
                    username: 'student1',
                    email: 'student1@example.com',
                    password: 'pass',
                    firstName: 'First',
                    lastName: 'Last',
                    role: 'student',
                }),
                studentNumber: '123456',
            }),
        }),
        new Review({
            id: 2,
            comment: 'Not worth the price.',
            rating: 2,
            trip: new Trip({
                id: 2,
                description: 'Trip to London',
                destination: 'UK',
                startDate: new Date('2024-02-01'),
                endDate: new Date('2024-02-10'),
                price: 200,
            }),
            student: new Student({
                id: 2,
                user: new User({
                    id: 2,
                    username: 'student2',
                    email: 'student2@example.com',
                    password: 'pass',
                    firstName: 'Second',
                    lastName: 'Last',
                    role: 'student',
                }),
                studentNumber: '654321',
            }),
        }),
    ];

    mockReviewDbGetAllReviews.mockResolvedValue(mockReviews);

    // When: Getting all reviews
    const reviews = await reviewService.getAllReviews();

    // Then: Expect the returned reviews to match the mock data
    expect(reviews).toEqual(mockReviews);
    expect(mockReviewDbGetAllReviews).toHaveBeenCalledTimes(1);
});

test('should return a review by ID', async () => {
    // Given: A review ID and a mock review
    const reviewId = 1;
    const mockReview = new Review({
        id: reviewId,
        comment: 'Amazing trip!',
        rating: 5,
        trip: new Trip({
            id: 1,
            description: 'Trip to Paris',
            destination: 'France',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-01-10'),
            price: 100,
        }),
        student: new Student({
            id: 1,
            user: new User({
                id: 1,
                username: 'student1',
                email: 'student1@example.com',
                password: 'pass',
                firstName: 'First',
                lastName: 'Last',
                role: 'student',
            }),
            studentNumber: '123456',
        }),
    });

    mockReviewDbGetReviewById.mockResolvedValue(mockReview);

    // When: Getting a review by ID
    const review = await reviewService.getReviewById(reviewId);

    // Then: Expect the returned review to match the mock review
    expect(review).toEqual(mockReview);
    expect(mockReviewDbGetReviewById).toHaveBeenCalledWith(reviewId);
    expect(mockReviewDbGetReviewById).toHaveBeenCalledTimes(1);
});
test('should throw an error if review ID does not exist', async () => {
    // Given: A non-existent review ID
    const reviewId = 999;
    mockReviewDbGetReviewById.mockResolvedValue(null);

    // When: Attempting to get a review by an invalid ID
    // Then: Expect an error to be thrown
    await expect(reviewService.getReviewById(reviewId))
        .rejects.toThrow("Failed to retrieve review. See server log for details.");
    expect(mockReviewDbGetReviewById).toHaveBeenCalledWith(reviewId);
    expect(mockReviewDbGetReviewById).toHaveBeenCalledTimes(1);
});

test('should throw an error if review ID is invalid', async () => {
    // Given: An invalid review ID
    const invalidReviewId = -1;

    // When: Attempting to get a review by an invalid ID
    // Then: Expect an error to be thrown
    await expect(reviewService.getReviewById(invalidReviewId))
        .rejects.toThrow("Invalid Review ID");
    expect(mockReviewDbGetReviewById).not.toHaveBeenCalled();
});
test('should create a review successfully', async () => {
    // Given: A valid review input, mock trip and student
    const input = {
        comment: 'Wonderful experience!',
        rating: 5,
        tripId: 1,
        studentId: 1,
    };

    const mockTrip = new Trip({
        id: 1,
        description: 'Trip to Paris',
        destination: 'France',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-10'),
        price: 100,
    });
    const mockStudent = new Student({
        id: 1,
        user: new User({
            id: 1,
            username: 'student1',
            email: 'student1@example.com',
            password: 'pass',
            firstName: 'First',
            lastName: 'Last',
            role: 'student',
        }),
        studentNumber: '123456',
    });
    const mockReview = new Review({
        comment: input.comment,
        rating: input.rating,
        trip: mockTrip,
        student: mockStudent,
    });

    mockTripDbGetTripById.mockResolvedValue(mockTrip);
    mockStudentDbGetStudentById.mockResolvedValue(mockStudent);
    mockReviewDbCreateReview.mockResolvedValue(mockReview);

    // When: Creating a new review
    const createdReview = await reviewService.createReview(input);

    // Then: Expect the created review to match the mock review
    expect(createdReview).toEqual(mockReview);
    expect(mockTripDbGetTripById).toHaveBeenCalledWith(input.tripId);
    expect(mockStudentDbGetStudentById).toHaveBeenCalledWith(input.studentId);
    expect(mockReviewDbCreateReview).toHaveBeenCalledWith({
        comment: input.comment,
        rating: input.rating,
        tripId: input.tripId,
        studentId: input.studentId,
    });
    expect(mockReviewDbCreateReview).toHaveBeenCalledTimes(1);
});

test('should throw error when creating review with invalid rating', async () => {
    // Given: A review input with an invalid rating
    const input = {
        comment: 'Great trip!',
        rating: 6,
        tripId: 1,
        studentId: 1,
    };

    // When: Attempting to create a review with an invalid rating
    // Then: Expect an error to be thrown
    await expect(reviewService.createReview(input))
        .rejects.toThrow("Rating must be between 1 and 5.");
    expect(mockTripDbGetTripById).not.toHaveBeenCalled();
    expect(mockStudentDbGetStudentById).not.toHaveBeenCalled();
    expect(mockReviewDbCreateReview).not.toHaveBeenCalled();
});


test('should throw error when creating review for nonexistent trip', async () => {
    // Given: A review input for a nonexistent trip
    const input = {
        comment: 'Great trip!',
        rating: 4,
        tripId: 999,
        studentId: 1,
    };

    mockTripDbGetTripById.mockResolvedValue(null);

    // When: Attempting to create a review for a nonexistent trip
    // Then: Expect an error to be thrown
    await expect(reviewService.createReview(input))
        .rejects.toThrow("Trip with ID 999 does not exist.");
    expect(mockTripDbGetTripById).toHaveBeenCalledWith(input.tripId);
    expect(mockStudentDbGetStudentById).not.toHaveBeenCalled();
    expect(mockReviewDbCreateReview).not.toHaveBeenCalled();
});


test('should throw error when creating review for nonexistent student', async () => {
    // Given: A review input for a nonexistent student
    const input = {
        comment: 'Great trip!',
        rating: 4,
        tripId: 1,
        studentId: 999,
    };

    const mockTrip = new Trip({
        id: 1,
        description: 'Trip to Paris',
        destination: 'France',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-10'),
        price: 100,
    });
    mockTripDbGetTripById.mockResolvedValue(mockTrip);
    mockStudentDbGetStudentById.mockResolvedValue(null);

    // When: Attempting to create a review for a nonexistent student
    // Then: Expect an error to be thrown
    await expect(reviewService.createReview(input))
        .rejects.toThrow("Student with ID 999 does not exist.");
    expect(mockTripDbGetTripById).toHaveBeenCalledWith(input.tripId);
    expect(mockStudentDbGetStudentById).toHaveBeenCalledWith(input.studentId);
    expect(mockReviewDbCreateReview).not.toHaveBeenCalled();
});
