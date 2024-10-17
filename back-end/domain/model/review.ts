import { Booking } from './booking';
import { Student } from './student';

export class Review {
    private id?: number; 
    private comment: string;
    private rating: number;
    private booking: Booking;
    private student: Student;

    constructor(review: { id?: number; comment: string; rating: number; booking: Booking; student: Student }) {
        this.id = review.id;
        this.comment = review.comment;
        this.rating = review.rating;
        this.booking = review.booking;
        this.student = review.student;
    }

    getId(): number | undefined {
        return this.id;
    }

    getComment(): string {
        return this.comment;
    }

    getRating(): number {
        return this.rating;
    }

    getBooking(): Booking {
        return this.booking;
    }

    validate(): { isValid: boolean; errors?: string[] } {
        const errors = [];

        if (!this.comment || this.comment.trim().length === 0) {
            errors.push('Comment is required.');
        }

        if (this.rating < 1 || this.rating > 5) {
            errors.push('Rating must be between 1 and 5.');
        }

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
    }
}
