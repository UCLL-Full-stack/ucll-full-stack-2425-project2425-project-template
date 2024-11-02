import bookingDb from '../../domain/data-access/booking.db';
import tripDb from '../../domain/data-access/trip.db';
import { Booking } from '../../domain/model/booking';
import bookingService from '../../service/booking.service';
import { PaymentStatus } from '@prisma/client';
import { Student } from '../../domain/model/student';

let createBookingMock: jest.Mock;
let mockTripDbGetTripById: jest.Mock;
let mockBookingDbCreateBooking: jest.Mock;
let mockBookingDbGetAllBookings: jest.Mock;
let mockBookingDbGetBookingById: jest.Mock;

beforeEach(() => {
    // Initialize mocks
    mockTripDbGetTripById = jest.fn();
    mockBookingDbCreateBooking = jest.fn();
    mockBookingDbGetAllBookings = jest.fn();
    mockBookingDbGetBookingById = jest.fn();

    // Mock the database functions
    tripDb.getTripById = mockTripDbGetTripById;
    bookingDb.createBooking = mockBookingDbCreateBooking;
    bookingDb.getAllBookings = mockBookingDbGetAllBookings;
    bookingDb.getBookingById = mockBookingDbGetBookingById;
});

afterEach(() => {
    jest.clearAllMocks();
});

// Test for creating a booking
test('given valid booking input, when createBooking is called, then booking is created', async () => {
    // given
    const tripId = 1;
    const studentIds = [1, 2];
    const bookingDate = new Date();
    const paymentStatus = PaymentStatus.Paid;

    const mockTrip = {
        id: tripId,
        destination: 'Paris',
        description: 'A trip to Paris', 
        location: 'France',             
        startDate: new Date(),          
        endDate: new Date(),            
        price: 100,                    
        images: 'image_url_here',       
    };

    const mockStudents = studentIds.map(id => new Student({
        id,
        username: `student${id}`,
        email: `student${id}@example.com`,
        password: `password${id}`,
        studentNumber: `S${id}`
    }));

    mockTripDbGetTripById.mockResolvedValue(mockTrip);
    mockBookingDbCreateBooking.mockResolvedValue(new Booking({
        id: 1,
        bookingDate,
        paymentStatus,
        trip: mockTrip,
        students: mockStudents
    }));

    // when
    const booking = await bookingService.createBooking({ bookingDate, tripId, studentIds, paymentStatus });

    // then
    expect(mockTripDbGetTripById).toHaveBeenCalledWith(tripId);
    expect(mockBookingDbCreateBooking).toHaveBeenCalled();
    expect(booking).toBeInstanceOf(Booking);
    expect(booking.bookingDate).toEqual(bookingDate);
    expect(booking.paymentStatus).toEqual(paymentStatus);
});

// Test for handling non-existent trip ID
test('given a non-existent trip ID, when createBooking is called, then an error is thrown', async () => {
    // given
    const tripId = 999; // Non-existent trip
    const studentIds = [1, 2];
    const bookingDate = new Date();
    const paymentStatus = PaymentStatus.Paid;

    mockTripDbGetTripById.mockResolvedValue(null); // No trip found

    // when & then
    await expect(bookingService.createBooking({ bookingDate, tripId, studentIds, paymentStatus }))
        .rejects.toThrow(`Trip with ID ${tripId} does not exist.`);
});

// Test for missing booking date
test('should throw an error if booking date is not provided', async () => {
    // given
    const tripId = 1;
    const studentIds = [1, 2];
    const paymentStatus = PaymentStatus.Paid;

    // when & then
    await expect(bookingService.createBooking({ bookingDate: undefined, tripId, studentIds, paymentStatus }))
        .rejects.toThrow('Booking date is required.');
});

// Test for fetching all bookings
test('should return all bookings', async () => {
    // given
    const mockBookings = [
        new Booking({
            id: 1,
            bookingDate: new Date(),
            paymentStatus: PaymentStatus.Paid,
            trip: { id: 1, destination: 'Paris' }, // Mock trip
            students: [],
        }),
    ];

    mockBookingDbGetAllBookings.mockResolvedValue(mockBookings);

    // when
    const bookings = await bookingService.getAllBookings();

    // then
    expect(bookings).toHaveLength(1);
    expect(bookings[0]).toMatchObject(mockBookings[0]);
});

// Test for error when fetching all bookings fails
test('should throw an error if fetching all bookings fails', async () => {
    // given
    mockBookingDbGetAllBookings.mockRejectedValue(new Error('Database error'));

    // when & then
    await expect(bookingService.getAllBookings()).rejects.toThrow('Could not retrieve bookings.');
});

// Test for returning a booking by ID
test('should return a booking by ID', async () => {
    // given
    const bookingId = 1;
    const mockBooking = new Booking({
        id: bookingId,
        bookingDate: new Date(),
        paymentStatus: PaymentStatus.Paid,
        trip: { id: 1 }, 
        students: [],
    });

    mockBookingDbGetBookingById.mockResolvedValue(mockBooking);

    // when
    const booking = await bookingService.getBookingById(bookingId);

    // then
    expect(booking).toEqual(mockBooking);
});

// Test for invalid booking ID
test('should throw an error if booking ID is invalid', async () => {
    // when & then
    await expect(bookingService.getBookingById(0)).rejects.toThrow('Invalid Booking ID');
    await expect(bookingService.getBookingById(-1)).rejects.toThrow('Invalid Booking ID');
});
