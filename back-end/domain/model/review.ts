import { Booking } from './booking';

export class Review {
    private id?: number;
    private comment: string;
    private rating: number;
    private booking: Booking;

    constructor(review: { id?: number; comment: string; rating: number; booking: Booking }) {
        this.id = review.id;
        this.comment = review.comment;
        this.rating = review.rating;
        this.booking = review.booking;
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

    equals(review: Review): boolean {
        return (
            this.id === review.getId() &&
            this.comment === review.getComment() &&
            this.rating === review.getRating() &&
            this.booking.equals(review.getBooking())
        );
    }
}
