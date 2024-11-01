import database from '../../util/database';
import { Trip } from '../model/trip';

const getAllTrips = async (): Promise<Trip[]> => {
    const tripsPrisma = await database.trip.findMany({
        include: {
            bookings: true,
            reviews: true,
        }
    });
    return tripsPrisma.map((tripPrisma) => Trip.from(tripPrisma));
};

const getTripById = async (tripId: number): Promise<Trip | null> => {
    try {
        const tripPrisma = await database.trip.findUnique({
            where: { id: tripId },
            include: {
                bookings: true,
                reviews: true,
            }
        });
        return tripPrisma ? Trip.from(tripPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
};

const createTrip = async ({
    description,
    location,
    startDate,
    endDate,
    price,
}: {
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
    price: number;
}): Promise<Trip> => {
    try {
        const trip = new Trip({
            description,
            location,
            startDate,
            endDate,
            price,
            bookings: [],
            reviews: []
        });
        
        trip.validate();

        const tripPrisma = await database.trip.create({
            data: {
                description,
                location,
                startDate,
                endDate,
                price,
            },
            include: {
                bookings: true,
                reviews: true,
            }
        });
        return Trip.from(tripPrisma);
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
};

export default {
    getAllTrips,
    getTripById,
    createTrip
};
