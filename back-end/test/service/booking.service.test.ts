import bookingService from '../../service/booking.service';
import bookingDb from '../../repository/booking.db';
import { Booking } from '../../model/booking';
import { Trip } from '../../model/trip';
import { PaymentStatus } from '@prisma/client';
import studentDb from '../../repository/student.db';
import { Student } from '../../model/student';
import { User } from '../../model/user';

let mockBookingDbGetAllBookings: jest.Mock;
let mockBookingDbGetBookingById: jest.Mock;
let mockBookingDbDeleteBooking: jest.Mock;


beforeEach(() => {
    mockBookingDbGetAllBookings = jest.fn();
    mockBookingDbGetBookingById = jest.fn();
    mockBookingDbDeleteBooking = jest.fn();

    bookingDb.deleteBooking = mockBookingDbDeleteBooking;
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
            paymentStatus: PaymentStatus.Paid, 
            students: [], 
            trip: new Trip({ 
                id: 1, 
                description: 'Trip to Paris', 
                destination: 'France', 
                startDate: new Date('2024-01-01'), 
                endDate: new Date('2024-01-10'), 
                price: 100 
            }) 
        }),
        new Booking({ 
            id: 2, 
            bookingDate: new Date(), 
            paymentStatus: PaymentStatus.Pending, 
            students: [],
            trip: new Trip({ 
                id: 2, 
                description: 'Trip to London', 
                destination: 'UK', 
                startDate: new Date('2024-02-01'), 
                endDate: new Date('2024-02-15'), 
                price: 200 
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

test('should return a booking by ID', async () => {
    // Given
    const bookingId = 1;
    const mockTrip = new Trip({ 
        id: 1, 
        description: 'Trip to Paris', 
        destination: 'France', 
        startDate: new Date('2024-01-01'), 
        endDate: new Date('2024-01-10'), 
        price: 100 
    });
    const mockBooking: Booking = new Booking({ 
        id: bookingId, 
        bookingDate: new Date(), 
        paymentStatus: PaymentStatus.Paid, 
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

test('should add students to a booking', async () => {
    // Given
    const mockBooking = new Booking({
        id: 1,
        bookingDate: new Date(),
        paymentStatus: PaymentStatus.Paid,
        students: [], 
        trip: new Trip({ 
            id: 1, 
            description: 'Trip to Paris', 
            destination: 'France', 
            startDate: new Date('2024-01-01'), 
            endDate: new Date('2024-01-10'), 
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
            password: 'securePassword123',
            role: 'student'
        }),
        studentNumber: 'S12345'
    });

    const mockStudent2 = new Student({
        id: 2,
        user: new User({
            id: 2,
            username: 'student2',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            password: 'securePassword123',
            role: 'student'
        }),
        studentNumber: 'S67890'
    });
    const studentsInput = [
        { id: mockStudent1.getId() },
        { id: mockStudent2.getId() }
    ];

    const updatedBooking = new Booking({
        id: mockBooking.getId(),
        bookingDate: mockBooking.getBookingDate(),
        paymentStatus: mockBooking.getPaymentStatus(),
        students: [mockStudent1, mockStudent2],
        trip: mockBooking.getTrip()
    });

    bookingDb.getBookingById = jest.fn().mockResolvedValue(mockBooking);
    studentDb.getStudentById = jest.fn()
        .mockResolvedValueOnce(mockStudent1)
        .mockResolvedValueOnce(mockStudent2);
    bookingDb.updateStudentsOfBooking = jest.fn().mockResolvedValue(updatedBooking);

    // When
    const result = await bookingService.addStudentsToBooking({
        booking: {
            id: mockBooking.getId(),
            studentIds: [],
            tripId: 0,
            paymentStatus: 'Pending',
            studentsId: []
        }, 
        students: studentsInput
    });

    // Then
    expect(result).toEqual(updatedBooking); 
    expect(bookingDb.updateStudentsOfBooking).toHaveBeenCalledWith({ booking: updatedBooking });
    expect(studentDb.getStudentById).toHaveBeenCalledWith(mockStudent1.getId());
    expect(studentDb.getStudentById).toHaveBeenCalledWith(mockStudent2.getId());
});

test('should throw error if invalid student ID is provided', async () => {
    // Given
    const invalidStudentId = -1;
    const bookingId = 1;
    const studentsInput = [{ id: invalidStudentId }];

    const mockBooking = new Booking({
        id: bookingId,
        bookingDate: new Date(),
        paymentStatus: PaymentStatus.Paid,
        students: [], 
        trip: new Trip({ 
            id: 1, 
            description: 'Trip to Paris', 
            destination: 'France', 
            startDate: new Date('2024-01-01'), 
            endDate: new Date('2024-01-10'),  
            price: 100 
        })
    });

    bookingDb.getBookingById = jest.fn().mockResolvedValue(mockBooking);
    studentDb.getStudentById = jest.fn().mockResolvedValue(null);

    // When & Then
    await expect(bookingService.addStudentsToBooking({
        booking: {
            id: bookingId,
            tripId: 1,
            studentIds: [invalidStudentId],
            paymentStatus: PaymentStatus.Paid,
            studentsId: []
        },
        students: studentsInput
    })).rejects.toThrow('Student with ID -1 not found');
});

test('should delete a booking successfully', async () => {
    // Given
    const bookingId = 1;

    const mockBooking = new Booking({
        id: bookingId,
        bookingDate: new Date(),
        paymentStatus: PaymentStatus.Paid,
        students: [],
        trip: new Trip({
            id: 1,
            description: 'Trip to Paris',
            destination: 'France',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-01-10'),
            price: 100,
        }),
    });

    mockBookingDbGetBookingById.mockResolvedValue(mockBooking);
    mockBookingDbDeleteBooking.mockResolvedValue(true);

    // When
    const result = await bookingService.deleteBooking(bookingId);

    // Then
    expect(result).toBe(true);
    expect(mockBookingDbGetBookingById).toHaveBeenCalledWith(bookingId); 
    expect(mockBookingDbDeleteBooking).toHaveBeenCalledWith(bookingId); 
});


test('should throw an error if booking ID is invalid when deleting', async () => {
    // Given
    const invalidBookingId = -1;

    // When & Then
    await expect(bookingService.deleteBooking(invalidBookingId)).rejects.toThrow("Invalid Booking ID");
    expect(mockBookingDbDeleteBooking).not.toHaveBeenCalled(); 
});
