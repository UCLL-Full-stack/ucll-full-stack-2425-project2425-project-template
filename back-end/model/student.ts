import { Booking } from './booking';
import { Student as StudentPrisma, Booking as BookingPrisma, Review as ReviewPrisma, Trip as TripPrisma } from '@prisma/client';
import { Review } from './review';
import { Role } from '../types';

export class Student {
    private id?: number;
    private username: string;
    private email: string;
    private password: string;
    private studentNumber: string;
    private bookings: Booking[] = [];
    private firstName: string;
    private lastName: string;
    private role: Role;

    constructor(student: {
        id?: number;
        username: string;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        role: Role;
        studentNumber: string;
        bookings?: Booking[]; 
        review?: Review | null; 
    }) {
        this.id = student.id;
        this.username = student.username;
        this.email = student.email;
        this.firstName = student.firstName;
        this.lastName = student.lastName;
        this.role = student.role;
        this.password = student.password;
        this.studentNumber = student.studentNumber;
        this.bookings = student.bookings || []; 
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
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
        firstName,
        lastName,
        role,
        bookings = [],
    }: StudentPrisma & { bookings: (BookingPrisma & { trip: TripPrisma })[] }) : Student {
        return new Student({
            id: id ? Number(id) : undefined,
            username,
            email,
            password,
            firstName,
            lastName,
            role: role as Role,
            studentNumber,
            bookings: bookings.map((booking) => Booking.from({...booking, trip: booking.trip, students: []})),
        });
    }
}
