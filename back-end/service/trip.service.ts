import tripDb from "../repository/trip.db";
import { Trip } from "../model/trip";
import { TripInput } from "../types";

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

    if (price < 0) {
        throw new Error("Price must be a positive number.");
    }

    const newTrip = new Trip({ description, destination, startDate, endDate, price, });
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

export default { createTrip, getAllTrips, getTripById };
