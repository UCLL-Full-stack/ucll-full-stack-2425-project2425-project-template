import { Booking } from './booking';

export class Student {
    private id?: number;
    private username: string;
    private email: string;
    private password: string;
    private studentNumber: string;
    private bookings: Booking[] = [];

    constructor(student: { id?: number; username: string; email: string; password: string; studentNumber: string; bookings?: Booking[] }) {
        this.id = student.id;
        this.username = student.username;
        this.email = student.email;
        this.password = student.password;
        this.studentNumber = student.studentNumber;
        if (student.bookings) {
            this.bookings = student.bookings;
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getBookings(): Booking[] {
        return this.bookings;
    }

    addBooking(booking: Booking): void {
        if (this.bookings.some(existingBooking => existingBooking.equals(booking))) {
            throw new Error('Booking is already associated with this student');
        }
        this.bookings.push(booking);
    }

    equals(student: Student): boolean {
        return (
            this.id === student.getId() &&
            this.username === student.getUsername() &&
            this.email === student.getEmail()
        );
    }
}
