import { Trip } from './trip';
import { Review } from './review';
import {
    Booking as BookingPrisma,
    Trip as TripPrisma,
    Review as ReviewPrisma,
    Student as StudentPrisma,
    PaymentStatus,
} from '@prisma/client';
import { Student } from './student';

export class Booking {
    private id?: number;
    private bookingDate: Date;
    private paymentStatus: PaymentStatus; 
    private students: Student[]; 
    private trip: Trip;

    constructor(booking: {
        id?: number;
        bookingDate: Date;
        paymentStatus: PaymentStatus;
        students: Student[]; 
        trip: Trip;
    }) {
        this.id = booking.id;
        this.bookingDate = booking.bookingDate;
        this.paymentStatus = booking.paymentStatus;
        this.students = booking.students; 
        this.trip = booking.trip;
    }

    validate() {
        if (!this.bookingDate) {
            throw new Error('Booking date is required.');
        }
        if (!this.paymentStatus) {
            throw new Error('Payment status is required.');
        }
        if (!this.trip) {
            throw new Error('Trip is required.'); 
        }
    }

    static from({
        id,
        bookingDate,
        paymentStatus,
        trip,
        students,
    }: BookingPrisma & { trip: TripPrisma, students: StudentPrisma[] }) : Booking {
        return new Booking({
            id: id ? Number(id) : undefined,
            bookingDate,
            paymentStatus: paymentStatus as PaymentStatus, 
            trip: Trip.from(trip),
            students: students.map((student) => Student.from({ ...student, bookings: [] })) 
        });
    }
}
