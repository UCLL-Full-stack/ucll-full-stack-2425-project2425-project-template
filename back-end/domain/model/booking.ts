import { Trip } from './trip';
import { Review } from './review';
import {
    Booking as BookingPrisma,
    Trip as TripPrisma,
    Review as ReviewPrisma,
    Student as StudentPrisma
} from '@prisma/client';
import { Student } from './student';
import { PaymentStatus } from './paymentStatusEnum';

export class Booking {
    private id?: number;
    private bookingDate: Date;
    private paymentStatus: PaymentStatus; 
    private students: Student[]; 
    private trip: Trip;
    private review?: Review; 

    constructor(booking: {
        id?: number;
        bookingDate: Date;
        paymentStatus: PaymentStatus;
        students?: Student[]; 
        trip: Trip;
        review?: Review; 
    }) {
        this.id = booking.id;
        this.bookingDate = booking.bookingDate;
        this.paymentStatus = booking.paymentStatus;
        this.students = booking.students || []; 
        this.trip = booking.trip;
        this.review = booking.review; 
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
        review,
        students,
    }: BookingPrisma & { trip: TripPrisma, review?: ReviewPrisma, students: StudentPrisma[] }) : Booking {
        return new Booking({
            id: id ? Number(id) : undefined,
            bookingDate,
            paymentStatus: paymentStatus as PaymentStatus, 
            trip: Trip.from({ ...trip, bookings: [], reviews: [] }),
            review: review ? Review.from({ ...review, trip: Trip.from(trip), student: Student.from(students[0]) }) : undefined,
            students: students.map((student) => Student.from({ ...student, bookings: [], review: null })) 
        });
    }
}
