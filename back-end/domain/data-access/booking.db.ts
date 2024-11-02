import { PaymentStatus } from '@prisma/client';
import database from '../../util/database';
import { Booking } from '../model/booking';

const getAllBookings = async (): Promise<Booking[]> => {
    const bookingsPrisma = await database.booking.findMany({
        include: {
            trip: true,
            students: true
        }
    });
    return bookingsPrisma.map((bookingPrisma) => Booking.from(bookingPrisma));
};

const getBookingById = async (bookingId: number): Promise<Booking | null> => {
    const bookingPrisma = await database.booking.findUnique({
        where: { id: bookingId },
        include: {
            trip: true,
            students: true
        }
    });
    return bookingPrisma ? Booking.from(bookingPrisma) : null;
};

const createBooking = async (bookingData: {
    bookingDate: Date;
    tripId: number;
    studentIds: number[];  
    paymentStatus: PaymentStatus;  
}): Promise<Booking> => {
    const bookingPrisma = await database.booking.create({
        data: {
            bookingDate: bookingData.bookingDate,
            paymentStatus: bookingData.paymentStatus as unknown as PaymentStatus,  // Type assertion here
            trip: { connect: { id: bookingData.tripId } },
            students: {
                connect: bookingData.studentIds.map((id) => ({ id }))  
            }
        },
        include: {
            trip: true,
            students: true  
        }
    });

    return Booking.from(bookingPrisma);
};



export default {
    getAllBookings,
    getBookingById,
    createBooking
};
