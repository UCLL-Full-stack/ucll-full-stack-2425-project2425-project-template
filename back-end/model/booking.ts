import { Trip } from './trip';
import { Review } from './review';
import {
    Booking as BookingPrisma,
    Trip as TripPrisma,
    Review as ReviewPrisma,
    Student as StudentPrisma,
    PaymentStatus,
    User as UserPrisma
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
        // this.validate(booking);
        this.id = booking.id;
        this.bookingDate = booking.bookingDate;
        this.paymentStatus = booking.paymentStatus;
        this.students = booking.students; 
        this.trip = booking.trip;
    }

    validate(booking: {
        id?: number;
        bookingDate: Date;
        paymentStatus: PaymentStatus;
        students: Student[]; 
        trip: Trip;
    }) {
        if (!booking.bookingDate) {
            throw new Error('Booking date is required.');
        }
        if (!booking.paymentStatus) {
            throw new Error('Payment status is required.');
        }
        if (!booking.trip) {
            throw new Error('Trip is required.'); 
        }
    }

    addStudentToBooking(student: Student) {
        if (!this.students.includes(student)) {
            this.students.push(student);
        }
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getStudents(): Student[] {
        return this.students;
    }

    public getTrip(): Trip {
        return this.trip;
    }
    public getStatus(): PaymentStatus {
        return this.paymentStatus; 
    }
    getBookingDate() {
        return this.bookingDate;
      }
    
    getPaymentStatus() {
        return this.paymentStatus;
      }
    
    equals(booking: Booking): boolean {
        return (
            this.id === booking.getId() &&
            this.bookingDate.getTime() === booking.bookingDate.getTime() &&
            this.paymentStatus === booking.paymentStatus &&
            this.trip.equals(booking.trip) &&
            this.students.length === booking.students.length &&
            this.students.every((student, index) => student.equals(booking.students[index]))
        );
    }

    static from({
        id,
        bookingDate,
        paymentStatus,
        trip,
        students,
    }: BookingPrisma & { trip: TripPrisma; students: (StudentPrisma & { user: UserPrisma })[] }): Booking {
        return new Booking({
            id: id ? Number(id) : undefined, 
            bookingDate,
            paymentStatus: paymentStatus as PaymentStatus, 
            trip: Trip.from(trip), 
            students: students.map((student) =>
                Student.from({...student, user: student.user})
            ),
        });
    }
}
