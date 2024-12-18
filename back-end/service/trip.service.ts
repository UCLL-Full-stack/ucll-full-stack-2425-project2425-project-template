import tripDb from "../repository/trip.db";
import { Trip } from "../model/trip";
import { TripInput } from "../types";
import bookingDb from "../repository/booking.db";
import { Booking } from "../model/booking";

const createTrip = async (input: TripInput): Promise<Trip> => {
    const { description, startDate, endDate, price, destination } = input;

    if (!description || description.trim().length === 0) {
        throw new Error("Description is required.");
    }

    if (!destination || destination.trim().length === 0) {
        throw new Error("Destination is required.");
    }
    
    if (!startDate) {
        throw new Error("Start date is required.");
    }

    if (!endDate) {
        throw new Error("End date is required.");
    }

    if (price < 0 || isNaN(price)) {
        throw new Error("Price must be a positive number.");
    }

    if (new Date(startDate) >= new Date(endDate)) {
        throw new Error("End date must be later than the start date.");
    }

    const newTrip = new Trip({ description, destination, startDate, endDate, price });
    newTrip.validate();

    try {
        return await tripDb.createTrip({
            description,
            destination,
            startDate,
            endDate,
            price,
        });
    } catch (error) {
        console.error("Error creating trip:", error);
        throw new Error("Trip creation failed due to a database error.");
    }
};

const getAllTrips = async (): Promise<Trip[]> => {
    try {
        return await tripDb.getAllTrips();
    } catch (error) {
        console.error("Error fetching all trips:", error);
        throw new Error("Could not retrieve trips.");
    }
};

const getTripById = async (tripId: number): Promise<Trip | null> => {
    if (typeof tripId !== 'number' || tripId <= 0) {
        throw new Error("Invalid Trip ID");
    }

    const trip = await tripDb.getTripById(tripId);
    if (!trip) {
        throw new Error(`Trip with ID ${tripId} does not exist.`);
    }
    return trip;
};

const getBookingForTrip = async ({ tripId }: { tripId: number }): Promise<Booking[]> => {
    try {
        const bookingsPrisma = await tripDb.getBookingForTrip({ tripId });
        return bookingsPrisma.map((bookingPrisma: any) => Booking.from(bookingPrisma));
    } catch (error) {
        console.error('Error fetching bookings for trip:', tripId, error);
        throw new Error(`Unable to retrieve bookings for trip with ID: ${tripId}. Please try again later.`);
    }
};

const updateBookingForTrip = async ({ booking }: { booking: Booking }): Promise<Booking | null> => {
    const bookingId = booking.getId();  
    const students = booking.getStudents();  
    const trip = booking.getTrip();  
    const status = booking.getStatus();  

    if (!bookingId) {
        throw new Error('Booking ID is required for updating the booking.');
    }

    try {
        const updatedBooking = await tripDb.updateBookingForTrip({
            booking: booking
        });

        return updatedBooking;
    } catch (error) {
        console.error('Error updating booking for trip:', bookingId, error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { createTrip, getAllTrips, getTripById, getBookingForTrip, updateBookingForTrip };
