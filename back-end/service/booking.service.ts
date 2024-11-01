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
