import bookingService from '../../service/booking.service';
import bookingDb from '../../repository/booking.db';
import { Booking } from '../../model/booking';
import { Trip } from '../../model/trip';
import { Student } from '../../model/student'; 
import { PaymentStatus } from '@prisma/client'; 

let mockBookingDbGetAllBookings: jest.Mock;
let mockBookingDbGetBookingById: jest.Mock;

beforeEach(() => {
    mockBookingDbGetAllBookings = jest.fn();
    mockBookingDbGetBookingById = jest.fn();

    bookingDb.getAllBookings = mockBookingDbGetAllBookings;
    bookingDb.getBookingById = mockBookingDbGetBookingById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('should return all bookings', async () => {
    // Given
    const mockBookings: Booking[] = [
        new Booking({ 
            id: 1, 
            bookingDate: new Date(), 
            paymentStatus: 'Paid', 
            students: [], 
            trip: new Trip({ id: 1, description: 'Trip to Paris', destination: 'France', startDate: new Date(), endDate: new Date(), price: 100 }) 
        }),
        new Booking({ 
            id: 2, 
            bookingDate: new Date(), 
            paymentStatus: 'Pending', 
            students: [],
            trip: new Trip({ id: 2, description: 'Trip to London', destination: 'UK', startDate: new Date(), endDate: new Date(), price: 200 }) 
        }),
    ];

    mockBookingDbGetAllBookings.mockResolvedValue(mockBookings);

    // When
    const bookings = await bookingService.getAllBookings();

    // Then
    expect(bookings).toEqual(mockBookings);
    expect(mockBookingDbGetAllBookings).toHaveBeenCalled();
});

test('should return a booking by ID', async () => {
    // Given
    const bookingId = 1;
    const mockTrip = new Trip({ id: 1, description: 'Trip to Paris', destination: 'France', startDate: new Date(), endDate: new Date(), price: 100 });
    const mockBooking: Booking = new Booking({ 
        id: bookingId, 
        bookingDate: new Date(), 
        paymentStatus: 'Paid', 
        students: [],
        trip: mockTrip 
    });

    mockBookingDbGetBookingById.mockResolvedValue(mockBooking);

    // When
    const booking = await bookingService.getBookingById(bookingId);

    // Then
    expect(booking).toEqual(mockBooking);
    expect(mockBookingDbGetBookingById).toHaveBeenCalledWith(bookingId);
});

test('should throw an error if booking ID does not exist', async () => {
    // Given
    const bookingId = 999; 
    mockBookingDbGetBookingById.mockResolvedValue(null); 

    // When & Then
    await expect(bookingService.getBookingById(bookingId)).rejects.toThrow(`Booking with ID ${bookingId} does not exist.`);
});

test('should throw an error if booking ID is invalid', async () => {
    // Given
    const invalidBookingId = -1;

    // When & Then
    await expect(bookingService.getBookingById(invalidBookingId)).rejects.toThrow("Invalid Booking ID");
});
