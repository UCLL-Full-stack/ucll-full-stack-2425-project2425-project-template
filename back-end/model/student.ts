import { Booking } from './booking';
import { Student as StudentPrisma, Booking as BookingPrisma, Review as ReviewPrisma, Trip as TripPrisma, User as UserPrisma } from '@prisma/client';
import { Review } from './review';
import { Role } from '../types';
import { User } from './user';

export class Student {
    private id?: number;
    private studentNumber: string;
    private bookings: Booking[] = [];
    private user: User;

    constructor(student: {
        id?: number;
        user: User;
        studentNumber: string;
        bookings?: Booking[]; 
        review?: Review | null; 
    }) {
        this.id = student.id;
        this.user = student.user;
        this.studentNumber = student.studentNumber;
        this.bookings = student.bookings || []; 
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getStudentnumber(): string {
        return this.studentNumber;
    }

    validate() {
        if (!this.studentNumber || this.studentNumber.trim() === '') {
            throw new Error('Student number is required.');
        }
    }
    static from({
        id,
        user,
        studentNumber,
        bookings = [],
    }: StudentPrisma & { bookings: (BookingPrisma & { trip: TripPrisma })[]; user: UserPrisma }) : Student {
        return new Student({
            id: id ? Number(id) : undefined,
            user: User.from(user),
            studentNumber,
            bookings: bookings.map((booking) => Booking.from({...booking, trip: booking.trip, students: []})),
        });
    }
}
