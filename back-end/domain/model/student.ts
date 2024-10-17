import { Booking } from './booking';
import { Review } from './review';
import { Trip } from './trip';

export class Student {
    private id?: number;
    private username: string;
    private email: string;
    private password: string;
    private studentNumber: string;
    private favourites: Trip[] = [];
    private bookings: Booking[] = [];
    private reviews: Review[] = [];
    
    constructor(student: { id?: number; username: string; email: string; password: string; studentNumber: string; }) {
        this.id = student.id;
        this.username = student.username;
        this.email = student.email;
        this.password = student.password;
        this.studentNumber = student.studentNumber;
    }

    validate(): { isValid: boolean; errors?: string[] } {
        const errors = [];

        if (!this.username || this.username.trim() === '') {
            errors.push('Username is required.');
        }

        if (!this.email || this.email.trim() === '') {
            errors.push('Email is required.');
        } else if (!this.isValidEmail()) {
            errors.push('Invalid email format.');
        }

        if (!this.password || this.password.trim() === '') {
            errors.push('Password is required.');
        }

        if (!this.studentNumber || this.studentNumber.trim() === '') {
            errors.push('Student number is required.');
        }

        return {
            isValid: errors.length === 0,
            errors: errors.length > 0 ? errors : undefined,
        };
    }

    private isValidEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
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

    getPassword(): string {
        return this.password;
    }

    getFavourites(): Trip[] {
        return this.favourites;
    }

    getBookings(): Booking[] {
        return this.bookings;
    }

    getReviews(): Review[] {
        return this.reviews;
    }

    getStudentNumber(): string {
        return this.studentNumber;
    }

    addBooking(booking: Booking): void {
        if (this.bookings.some(existingBooking => existingBooking.equals(booking))) {
            throw new Error('Booking is already associated with this student');
        }
        this.bookings.push(booking);
    }
    addFavourite(trip: Trip): void {
        if (this.favourites.some(existingTrip => existingTrip.equals(trip))) {
            throw new Error('Trip is already in favourites');
        }
        this.favourites.push(trip);
    }

    addReview(review: Review): void {
        if (this.reviews.some(existingReview => existingReview.equals(review))) {
            throw new Error('Review is already associated with this student');
        }
        this.reviews.push(review);
    }
    equals(student: Student): boolean {
        return (
            this.id === student.getId() &&
            this.username === student.getUsername() &&
            this.email === student.getEmail() &&
            this.password === student.getPassword() &&
            this.studentNumber === student.getStudentNumber() &&
            this.bookings.length === student.getBookings().length &&
            this.bookings.every((booking, index) => booking.equals(student.getBookings()[index])) &&
            this.reviews.length === student.getReviews().length &&
            this.reviews.every((review, index) => review.equals(student.getReviews()[index]))
        );
    }
    
}
