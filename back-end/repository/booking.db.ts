import { PaymentStatus } from '@prisma/client';
import { Booking } from '../model/booking';
import database from '../util/database';

const getAllBookings = async (): Promise<Booking[]> => {
    const bookingsPrisma = await database.booking.findMany({
        include: {
            trip: true,
            students: {
                include: { user: true }
            }         }
    });
    return bookingsPrisma.map((bookingPrisma) => Booking.from(bookingPrisma));
};

const getBookingById = async (bookingId: number): Promise<Booking | null> => {
    const bookingPrisma = await database.booking.findUnique({
        where: { id: bookingId },
        include: {
            trip: true,
            students: {
                include: { user: true }
            }         }
    });
    return bookingPrisma ? Booking.from(bookingPrisma) : null;
};

const createBooking = async (bookingData: {bookingDate: Date, tripId: number, studentIds: number[], paymentStatus: PaymentStatus;}): Promise<Booking> => {
    const bookingPrisma = await database.booking.create({
        data: {
            bookingDate: bookingData.bookingDate,
            paymentStatus: bookingData.paymentStatus as unknown as PaymentStatus,
            trip: { connect: { id: bookingData.tripId } },
            students: {
                connect: bookingData.studentIds.map((id) => ({ id }))  
            }
        },
        include: {
            trip: true,
            students: {
                include: { user: true },
            },
        }
    });

    return Booking.from(bookingPrisma);
};

const getBookingForStudent = async ({ username }: { username: string }): Promise<Booking[]> => {
    try {
        const bookingsPrisma = await database.booking.findMany({
            where: {
                students: {
                    some: {
                        user: {
                            username: username,
                        },
                    },
                },
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
        console.error('Error fetching bookings for student:', username, error);
        throw new Error(`Unable to retrieve bookings for student with username: ${username}. Please try again later.`);
    }
};

const updateStudentsOfBooking = async ({
    booking,
}: {
    booking: Booking;
}): Promise<Booking | null> => {
    const bookingId = booking.getId(); 
    const students = booking.getStudents();  
    if (!bookingId) {
        throw new Error('Booking ID is required for updating students.');
    }

    if (students.length === 0) {
        throw new Error('At least one student is required to update the booking.');
    }

    try {
        const updatedBookingPrisma = await database.booking.update({
            where: { id: bookingId },
            data: {
                students: {
                    connect: students.map((student) => ({ id: student.getId() })),  
                },
            },
            include: {
                trip: true,
                students: { include: { user: true } },
            },
        });

        return updatedBookingPrisma ? Booking.from(updatedBookingPrisma) : null;
    } catch (error) {
        console.error('Error updating students for booking:', bookingId, error);
        throw new Error('Database error. See server log for details.');
    }
};
const deleteBooking = async (bookingId: number): Promise<void> => {
    try {
        await database.booking.delete({
            where: { id: bookingId },
        });
    } catch (error) {
        console.error("Error deleting booking from database:", error);
        throw new Error(`Unable to delete booking with ID: ${bookingId}.`);
    }
};
const updatePaymentStatus = async (bookingId: number, newStatus: PaymentStatus): Promise<Booking | null> => {
    try {
      const updatedBookingPrisma = await database.booking.update({
        where: { id: bookingId },
        data: {
          paymentStatus: newStatus,
        },
        include: {
          trip: true,
          students: {
            include: { user: true },
          },
        },
      });
  
      return updatedBookingPrisma ? Booking.from(updatedBookingPrisma) : null;
    } catch (error) {
      console.error('Error updating payment status for booking:', bookingId, error);
      throw new Error('Database error. See server log for details.');
    }
  };
  

export default {
    getAllBookings,
    getBookingById,
    deleteBooking,
    createBooking,
    getBookingForStudent,
    updatePaymentStatus,
    updateStudentsOfBooking
};
