import { Booking } from "../../model/booking";
import { PaymentStatus } from "../../model/paymentStatusEnum";
import { Student } from "../../model/student";
import { Trip } from "../../model/trip";
import { User } from "../../model/user";
import bookingDb from "../../repository/booking.db";
import studentDb from "../../repository/student.db";
import tripDb from "../../repository/trip.db"; 
import bookingService from "../../service/booking.service";

let mockBookingDbGetAllBookings: jest.Mock;
let mockBookingDbGetBookingById: jest.Mock;
let mockBookingDbUpdateStudentsOfBooking: jest.Mock;
let mockStudentDbGetStudentById: jest.Mock;
let mockTripDbGetTripById: jest.Mock; 

beforeEach(() => {
    mockBookingDbGetAllBookings = jest.fn();
    mockBookingDbGetBookingById = jest.fn();
    mockBookingDbUpdateStudentsOfBooking = jest.fn();
    mockStudentDbGetStudentById = jest.fn();
    mockTripDbGetTripById = jest.fn();  

    bookingDb.getAllBookings = mockBookingDbGetAllBookings;
    bookingDb.getBookingById = mockBookingDbGetBookingById;
    bookingDb.updateStudentsOfBooking = mockBookingDbUpdateStudentsOfBooking;
    studentDb.getStudentById = mockStudentDbGetStudentById;
    tripDb.getTripById = mockTripDbGetTripById;  
});

afterEach(() => {
    jest.clearAllMocks();
});

test('should return all bookings', async () => {
    // Given
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-01-10');
    
    const mockBookings: Booking[] = [
        new Booking({
            id: 1,
            bookingDate: new Date(),
            paymentStatus: PaymentStatus.Paid,
            students: [],
            trip: new Trip({
                id: 1,
                description: 'Trip to Paris',
                destination: 'France',
                startDate: startDate,
                endDate: endDate,
                price: 100
            })
        }),
    ];
    
    mockBookingDbGetAllBookings.mockResolvedValue(mockBookings);

    // When
    const bookings = await bookingService.getAllBookings({ username: 'admin', role: 'admin' });

    // Then
    expect(bookings).toEqual(mockBookings);
    expect(mockBookingDbGetAllBookings).toHaveBeenCalled();
});

test('should throw error for unauthorized user role', async () => {
    // Given
    const invalidRole = 'viewer';

    // When & Then
    await expect(bookingService.getAllBookings({ username: 'guest', role: invalidRole }))
        .rejects.toThrow('Unauthorized access');
});

test('should return a booking by ID', async () => {
    // Given
    const bookingId = 1;
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-01-10');
    
    const mockBooking = new Booking({
        id: bookingId,
        bookingDate: new Date(),
        paymentStatus: PaymentStatus.Paid,
        students: [],
        trip: new Trip({
            id: 1,
            description: 'Trip to Paris',
            destination: 'France',
            startDate: startDate,
            endDate: endDate,
            price: 100
        })
    });
    
    mockBookingDbGetBookingById.mockResolvedValue(mockBooking);

    // When
    const booking = await bookingService.getBookingById(bookingId);

    // Then
    expect(booking).toEqual(mockBooking);
    expect(mockBookingDbGetBookingById).toHaveBeenCalledWith(bookingId);
});

test('should throw error if booking ID is invalid', async () => {
    // Given
    const invalidBookingId = -1;

    // When & Then
    await expect(bookingService.getBookingById(invalidBookingId))
        .rejects.toThrow('Invalid Booking ID');
});


test('should add students to a booking', async () => {
    // Given
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-01-10');
    
    const mockBooking = new Booking({
        id: 1,
        bookingDate: new Date(),
        paymentStatus: PaymentStatus.Paid,
        students: [],
        trip: new Trip({
            id: 1,
            description: 'Trip to Paris',
            destination: 'France',
            startDate: startDate,
            endDate: endDate,
            price: 100
        })
    });

    const mockStudent1 = new Student({
        id: 1,
        user: new User({
            id: 1,
            username: 'student1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            role: 'student',
            password: "Johndoe"
        }),
        studentNumber: 'S12345'
    });

    const studentsInput = [{ id: mockStudent1.getId() }];

    const updatedBooking = new Booking({
        id: mockBooking.getId(),
        bookingDate: mockBooking.getBookingDate(),
        paymentStatus: mockBooking.getPaymentStatus(),
        students: [mockStudent1],
        trip: mockBooking.getTrip()
    });

    mockBookingDbGetBookingById.mockResolvedValue(mockBooking);
    mockStudentDbGetStudentById.mockResolvedValue(mockStudent1);
    mockBookingDbUpdateStudentsOfBooking.mockResolvedValue(updatedBooking);

    // When
    const result = await bookingService.addStudentsToBooking({
        booking: { id: mockBooking.getId(), studentIds: [], tripId: 0, paymentStatus: 'Pending', studentsId: [] },
        students: studentsInput
    });

    // Then
    expect(result).toEqual(updatedBooking);
    expect(mockBookingDbUpdateStudentsOfBooking).toHaveBeenCalledWith({ booking: updatedBooking });
    expect(mockStudentDbGetStudentById).toHaveBeenCalledWith(mockStudent1.getId());
});


test('should throw error if invalid student ID is provided', async () => {
    // Given
    const bookingId = 1;
    const invalidStudentId = -1;
    
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-01-10');
    
    const mockBooking = new Booking({
        id: bookingId,
        bookingDate: new Date(),
        paymentStatus: PaymentStatus.Paid,
        students: [],
        trip: new Trip({
            id: 1,
            description: 'Trip to Paris',
            destination: 'France',
            startDate: startDate,
            endDate: endDate,
            price: 100
        })
    });

    mockBookingDbGetBookingById.mockResolvedValue(mockBooking);
    mockStudentDbGetStudentById.mockResolvedValue(null);

    // When & Then
    await expect(bookingService.addStudentsToBooking({
        booking: { id: bookingId, tripId: 1, studentIds: [invalidStudentId], paymentStatus: PaymentStatus.Paid, studentsId: [] },
        students: [{ id: invalidStudentId }]
    })).rejects.toThrow(`Student with ID ${invalidStudentId} not found`);
});
