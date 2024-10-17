import { Student } from './student';
import { Trip } from './trip';

export class Booking {
    private id?: number;
    private bookingDate: Date;
    private paymentStatus: string;
    private student: Student;
    private trip: Trip;

    constructor(booking: { id?: number; bookingDate: Date; paymentStatus: string; student: Student; trip: Trip }) {
        this.id = booking.id;
        this.bookingDate = booking.bookingDate;
        this.paymentStatus = booking.paymentStatus;
        this.student = booking.student;
        this.trip = booking.trip;
    }

    getId(): number | undefined {
        return this.id;
    }

    getBookingDate(): Date {
        return this.bookingDate;
    }

    getPaymentStatus(): string {
        return this.paymentStatus;
    }

    getStudent(): Student {
        return this.student;
    }

    getTrip(): Trip {
        return this.trip;
    }

    equals(booking: Booking): boolean {
        return (
            this.id === booking.getId() &&
            this.bookingDate === booking.getBookingDate() &&
            this.paymentStatus === booking.getPaymentStatus() &&
            this.student.equals(booking.getStudent()) &&
            this.trip.equals(booking.getTrip())
        );
    }
}
