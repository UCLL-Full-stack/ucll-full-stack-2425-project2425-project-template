<<<<<<< HEAD
import { Review as ReviewPrisma } from '@prisma/client';
import { Student } from './student';
import { Trip } from './trip';
=======
import { Booking } from './booking';
import { Student } from './student';
>>>>>>> 7b5040db1acd6364f8d87d0448785e46e76aee34

export class Review {
    private id?: number; 
    private comment: string;
    private rating: number;
<<<<<<< HEAD
    private trip: Trip;         
    private student: Student;    

    constructor(review: {
        id?: number;
        comment: string;
        rating: number;
        trip: Trip;          
        student: Student;  
    }) {
        this.id = review.id;
        this.comment = review.comment;
        this.rating = review.rating;
        this.trip = review.trip;              
        this.student = review.student;         
=======
    private booking: Booking;
    private student: Student;

    constructor(review: { id?: number; comment: string; rating: number; booking: Booking; student: Student }) {
        this.id = review.id;
        this.comment = review.comment;
        this.rating = review.rating;
        this.booking = review.booking;
        this.student = review.student;
>>>>>>> 7b5040db1acd6364f8d87d0448785e46e76aee34
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

<<<<<<< HEAD
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
    }: ReviewPrisma & { trip: Trip; student: Student }) { 
        return new Review({
            id: id ? Number(id) : undefined,
            comment,
            rating,
            trip,             
            student          
        });
=======
        return {
            isValid: errors.length === 0,
            errors: errors.length > 0 ? errors : undefined,
        };
      
    getStudent(): Student {
        return this.student;

    }

    equals(review: Review): boolean {
        return (
            this.id === review.getId() &&
            this.comment === review.getComment() &&
            this.rating === review.getRating() &&
            this.booking.equals(review.getBooking())&&
            this.student.equals(review.getStudent())
        );
>>>>>>> 7b5040db1acd6364f8d87d0448785e46e76aee34
    }
}
