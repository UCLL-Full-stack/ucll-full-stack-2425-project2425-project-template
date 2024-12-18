import { PaymentStatus } from "@prisma/client";
import bookingDb from "../repository/booking.db";
import tripDb from "../repository/trip.db";
import { Booking } from "../model/booking";
import { BookingInput } from "../types";
import { Student } from "../model/student";
import { User } from "../model/user";
import studentDb from "../repository/student.db";

const createBooking = async ({ bookingDate, tripId, studentIds, paymentStatus }: BookingInput): Promise<Booking> => {

    if (!bookingDate) {
        throw new Error("Booking date is required.");
    }

    const tripIdAsNumber = parseInt(tripId as unknown as string, 10);

    const trip = await tripDb.getTripById(tripIdAsNumber as number);
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

    const newBookingDb = await bookingDb.createBooking({ bookingDate, paymentStatus, tripId : tripIdAsNumber, studentIds});

    
    if (!newBookingDb) {
        throw new Error(`Booking not created`);
    }

    return newBookingDb;
};


const getAllBookings = async (): Promise<Booking[]> => {
    try {
        return await bookingDb.getAllBookings();
    } catch (error) {
        console.error("Error fetching all bookings:", error);
        throw new Error("Could not retrieve bookings.");
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

export default { createBooking, getAllBookings, getBookingById };
