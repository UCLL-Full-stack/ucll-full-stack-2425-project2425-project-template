import { Student } from './student';
import { Trip } from './trip';
import { Review } from './review';
import { PaymentStatus } from './paymentStatusEnum';

export class Booking {
    private id?: number; 
    private bookingDate: Date;
    private paymentStatus: PaymentStatus; 
    private student: Student;
    private trip: Trip;

    constructor(booking: { id?: number; bookingDate: Date; paymentStatus: PaymentStatus; student: Student; trip: Trip }) {
        this.id = booking.id;
        this.bookingDate = booking.bookingDate;
        this.paymentStatus = booking.paymentStatus;
        this.student = booking.student;
        this.trip = booking.trip;

        // Validate on instantiation
        const validationResult = this.validate();
        if (!validationResult.isValid) {
            throw new Error(`Validation failed: ${validationResult.errors?.join(', ')}`);
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getBookingDate(): Date {
        return this.bookingDate;
    }

    getPaymentStatus(): PaymentStatus {
        return this.paymentStatus;
    }

    getStudent(): Student {
        return this.student;
    }

    getTrip(): Trip {
        return this.trip;
    }

    validate(): { isValid: boolean; errors?: string[] } {
        const errors = [];

        if (!this.bookingDate) {
            errors.push('Booking date is required.');
        }

        if (!this.paymentStatus) {
            errors.push('Payment status is required.');
        } else if (!(this.paymentStatus in PaymentStatus)) {
            errors.push('Invalid payment status.');
        }

        return {
            isValid: errors.length === 0,
            errors: errors.length > 0 ? errors : undefined,
        };
    }

    equals(booking: Booking): boolean {
        return (
            this.id === booking.getId() &&
            this.bookingDate.getTime() === booking.getBookingDate().getTime() && // Compare timestamps for Date
            this.paymentStatus === booking.getPaymentStatus() &&
            this.student.equals(booking.getStudent()) &&
            this.trip.equals(booking.getTrip())
        );
    }
}
