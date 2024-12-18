import { PaymentStatus } from "@prisma/client";
import bookingDb from "../repository/booking.db";
import tripDb from "../repository/trip.db";
import { Booking } from "../model/booking";
import { BookingInput, StudentInput } from "../types";
import { Student } from "../model/student";
import { User } from "../model/user";
import studentDb from "../repository/student.db";
import { UnauthorizedError } from "express-jwt";
import { bookingRouter } from "../controller/booking.routes";

const createBooking = async (input: BookingInput): Promise<Booking> => {
    const { bookingDate, tripId, studentIds, paymentStatus } = input;

    if (!bookingDate) {
        throw new Error("Booking date is required.");
    }

    const trip = await tripDb.getTripById(tripId);
    if (!trip) {
        throw new Error(`Trip with ID ${tripId} does not exist.`);
    }
    const students = await Promise.all(
        studentIds.map(async (id) => {
            const student = await studentDb.getStudentById(id);
            if (!student) {
                throw new Error(`Student with ID ${id} does not exist.`);
            }
            return student;
        })
    );

    const newBooking = new Booking({ 
        bookingDate, 
        paymentStatus, 
        trip,
        students: students
    });

    newBooking.validate();

    const bookingData = {
        bookingDate,
        tripId,
        studentIds, 
        paymentStatus 
    };

    try {
        return await bookingDb.createBooking({
            bookingDate,
            paymentStatus,
            tripId,
            studentIds
        }); 
    } catch (error) {
        console.error("Error creating booking:", error);
        throw new Error("Booking creation failed due to a database error.");
    }
};


const getAllBookings = async ({ username, role }: { username: string, role: string }): Promise<Booking[]> => {
    if (role === 'admin') {
        return await bookingDb.getAllBookings();
    } else if (role === 'student') {
        return bookingDb.getBookingForStudent({ username }); 
    } else {
        throw new UnauthorizedError('You do not have permission to view schedules' as any, { message: 'Unauthorized access' });
    }
};

const getBookingById = async (bookingId: number): Promise<Booking> => {
    if (typeof bookingId !== 'number' || bookingId <= 0) {
        throw new Error("Invalid Booking ID");
    }

    const booking = await bookingDb.getBookingById(bookingId);
    if (!booking) {
        throw new Error(`Booking with ID ${bookingId} does not exist.`);
    }
    return booking;
};
const addStudentsToBooking = async ({
    booking: bookingInput,
    students: studentsInput,
}: {
    booking: BookingInput;
    students: StudentInput[];
}): Promise<Booking | null> => {
    if (!studentsInput.length) throw new Error('At least one student is required');

    const bookingId = bookingInput.id;

    if (bookingId === undefined || typeof bookingId !== 'number' || bookingId <= 0) {
        throw new Error('Booking ID is required and must be a valid number');
    }

    const booking = await bookingDb.getBookingById(bookingId);
    if (!booking) throw new Error('Booking not found');

    const students = await Promise.all(
        studentsInput.map(async (studentInput) => {
            const studentId = studentInput.id;

            if (studentId === undefined || typeof studentId !== 'number') {
                throw new Error(`Invalid student ID for student: ${studentInput}`);
            }

            const student = await studentDb.getStudentById(studentId);
            if (!student) throw new Error(`Student with id ${studentId} not found`);
            return student;
        })
    );

    students.forEach((student) => {
        booking.addStudentToBooking(student);
    });

    // Update the booking in the database with the new students
    try {
        return await bookingDb.updateStudentsOfBooking({
            booking,
        });
    } catch (error) {
        console.error("Error updating students in booking:", error);
        throw new Error("Failed to update students for the booking.");
    }
};


export default { createBooking, getAllBookings, getBookingById , addStudentsToBooking};
