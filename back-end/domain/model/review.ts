import { Student } from './student';
import { Trip } from './trip';
import { Booking } from './booking';
import {
    Trip as TripPrisma,
    Review as ReviewPrisma,
    Student as StudentPrisma
} from '@prisma/client';
export class Review {
    private id?: number; 
    private comment: string;
    private rating: number;
    private trip: Trip;         
    private student: Student;             

    constructor(review: { id?: number; comment: string; rating: number; student: Student; trip: Trip }) {
        this.id = review.id;
        this.comment = review.comment;
        this.rating = review.rating;
        this.student = review.student;
        this.trip = review.trip;
    }

    validate() {
        if (!this.comment || this.comment.trim().length === 0) {
            throw new Error('Comment is required.');
        }

        if (this.rating < 1 || this.rating > 5) {
            throw new Error('Rating must be between 1 and 5.');
        }
        
        if (!this.trip) {
            throw new Error('Trip is required.'); 
        }

        if (!this.student) {
            throw new Error('Student is required.'); 
        }
    }

    static from({
        id,
        comment,
        rating,
        trip,
        student
    }: ReviewPrisma & { trip: TripPrisma; student: StudentPrisma }) { 
        return new Review({
            id: id ? Number(id) : undefined,
            comment,
            rating,
            trip: Trip.from(trip),
            student: Student.from({ ...student, bookings: [] }),         
        });
    }
}
