import database from '../util/database';
import { Trip } from '../model/trip';
import { Booking } from '../model/booking';

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
    destination,
    startDate,
    endDate,
    price,
}: {
    description: string;
    destination: string;
    startDate: Date;
    endDate: Date;
    price: number;
}): Promise<Trip> => {
    try {
        const trip = new Trip({
            description,
            destination,
            startDate,
            endDate,
            price,
        });
        
        trip.validate();

        const tripPrisma = await database.trip.create({
            data: {
                description,
                destination,
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

const getBookingForTrip = async ({ tripId }: { tripId: number }): Promise<Booking[]> => {
    try {
        const bookingsPrisma = await database.booking.findMany({
            where: {
                tripId: tripId,
            },
            include: {
                trip: true, 
                students: {
                    include: {
                        user: true, 
                    },
                },
            },
        });

        return bookingsPrisma.map((bookingPrisma) => Booking.from(bookingPrisma)); 
    } catch (error) {
        console.error('Error fetching bookings for trip:', tripId, error);
        throw new Error(`Unable to retrieve bookings for trip with ID: ${tripId}. Please try again later.`);
    }
};

const updateBookingForTrip = async ({
    booking,
}: {
    booking: Booking;
}): Promise<Booking | null> => {
    const bookingId = booking.getId();  
    const students = booking.getStudents();  
    const trip = booking.getTrip();  
    const status = booking.getStatus();  

    if (!bookingId) {
        throw new Error('Booking ID is required for updating the booking.');
    }

    const studentIds = students.map(student => student.getId()); 

    try {
        const updatedBookingPrisma = await database.booking.update({
            where: { id: bookingId },
            data: {
                students: {
                    connect: studentIds.map(id => ({ id })) 
                },
                trip: { connect: { id: trip.getId() } }, 
                paymentStatus: status,  
            },
            include: {
                trip: true,
                students: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return updatedBookingPrisma ? Booking.from(updatedBookingPrisma) : null;
    } catch (error) {
        console.error('Error updating booking for trip:', bookingId, error);
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getAllTrips,
    getTripById,
    createTrip,
    getBookingForTrip,
    updateBookingForTrip, 
};
