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