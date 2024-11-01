import { Booking } from './booking';
import { Student as StudentPrisma, Booking as BookingPrisma, Review as ReviewPrisma } from '@prisma/client';
import { Review } from './review';

export class Student {
    private id?: number;
    private username: string;
    private email: string;
    private password: string;
    private studentNumber: string;
    private bookings: Booking[];
    private review?: Review | null;

    constructor(student: {
        id?: number;
        username: string;
        email: string;
        password: string;
        studentNumber: string;
        bookings?: Booking[]; 
        review?: Review | null; 
    }) {
        this.id = student.id;
        this.username = student.username;
        this.email = student.email;
        this.password = student.password;
        this.studentNumber = student.studentNumber;
        this.bookings = student.bookings || []; // Initialize to empty array if not provided
        this.review = student.review || null;
    }

    validate() {
        if (!this.username || this.username.trim() === '') {
            throw new Error('Username is required.');
        }

        if (!this.email || this.email.trim() === '') {
            throw new Error('Email is required.');
        } else if (!this.isValidEmail()) {
            throw new Error('Invalid email format.');
        }

        if (!this.password || this.password.trim() === '') {
            throw new Error('Password is required.');
        }

        if (!this.studentNumber || this.studentNumber.trim() === '') {
            throw new Error('Student number is required.');
        }
    }

    private isValidEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    static from({
        id,
        username,
        email,
        password,
        studentNumber,
        bookings,
        review,
    }: StudentPrisma & { bookings: BookingPrisma[], review?: ReviewPrisma | null}) : Student{
        return new Student({
            id: id ? Number(id) : undefined,
            username,
            email,
            password,
            studentNumber,
            bookings: bookings.map((booking) => Booking.from(booking)),
            review: review ? Review.from(review) : undefined 
        });
    }
}
