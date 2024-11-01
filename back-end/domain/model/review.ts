import { Review as ReviewPrisma } from '@prisma/client';
import { Student } from './student';
import { Trip } from './trip';

export class Review {
    private id?: number; 
    private comment: string;
    private rating: number;
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
    }: ReviewPrisma & { trip: Trip; student: Student }) { 
        return new Review({
            id: id ? Number(id) : undefined,
            comment,
            rating,
            trip,             
            student          
        });
    }
}
