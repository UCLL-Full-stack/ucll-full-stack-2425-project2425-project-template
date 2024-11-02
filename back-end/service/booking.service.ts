import { PaymentStatus } from "@prisma/client";
import bookingDb from "../domain/data-access/booking.db";
import tripDb from "../domain/data-access/trip.db";
import { Booking } from "../domain/model/booking";
import { BookingInput } from "../types";
import { Student } from "../domain/model/student";

const createBooking = async (input: BookingInput): Promise<Booking> => {
    const { bookingDate, tripId, studentIds, paymentStatus } = input;

    if (!bookingDate) {
        throw new Error("Booking date is required.");
    }

    const trip = await tripDb.getTripById(tripId);
    if (!trip) {
        throw new Error(`Trip with ID ${tripId} does not exist.`);
    }

    const students = studentIds.map(id => new Student({
        id, 
        username: "",
        email: "", 
        password: "",
        studentNumber: "",
    }));

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
