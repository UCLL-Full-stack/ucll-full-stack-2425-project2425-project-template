<<<<<<< HEAD
import bookingDb from "../domain/data-access/booking.db";
import tripDb from "../domain/data-access/trip.db";
import { Booking } from "../domain/model/booking";
import { BookingInput } from "../types";

const createBooking = async ({
    bookingDate,
    trip: tripInput
}: BookingInput): Promise<Booking> => {
    if (!bookingDate) throw new Error("Booking date is required.");
    
    const trip = await tripDb.getTripById(tripInput);
    if (!trip) {
        throw new Error(`Trip with ID ${tripInput} does not exist.`);
    }

    const newBooking = new Booking({ bookingDate, trip });
    newBooking.validate({ bookingDate });

    return await bookingDb.createBooking(newBooking);
};

const getAllBookings = async (): Promise<Booking[]> => {
    try {
        return await bookingDb.getAllBookings();
    } catch (error) {
        console.error("Error fetching all bookings:", error);
        throw new Error("Could not retrieve bookings.");
    }
}

const getBookingById = async (bookingId: number): Promise<Booking> => {
    if (typeof bookingId !== 'number' || bookingId <= 0) {
        throw new Error("Invalid Booking ID");
    }

    const booking = await bookingDb.getBookingById(bookingId);
    if (!booking) throw new Error(`Booking with id ${bookingId} does not exist.`);
    return booking;
}

export default { createBooking, getAllBookings, getBookingById };
=======
import { Booking } from "../domain/model/booking";

export class BookingRepository {
    private bookings: Booking[] = [];

    async getAllBookings(): Promise<Booking[]> {
        return this.bookings;
    }

    async addBooking(booking: Booking): Promise<Booking> {
        this.bookings.push(booking);
        return booking;
    }

    async getBookingById(id: number): Promise<Booking | undefined> {
        return this.bookings.find(booking => booking.getId() === id);
    }
    
    async getBookingsByStudentId(studentId: number): Promise<Booking[]> {
        return this.bookings.filter(booking => booking.getStudent().getId() === studentId);
    }
}
>>>>>>> 7b5040db1acd6364f8d87d0448785e46e76aee34
