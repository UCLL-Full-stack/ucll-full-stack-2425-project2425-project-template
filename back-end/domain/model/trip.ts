import { Booking } from './booking';
import { Review } from './review';
import {
    Trip as TripPrisma,
    Booking as BookingPrisma,
    Review as ReviewPrisma
} from '@prisma/client';

export class Trip {
    private id?: number; 
    private description: string;
    private location: string;
    private startDate: Date;
    private endDate: Date;
    private price: number;
    private bookings: Booking[];
    private reviews: Review[]; 

    constructor(trip: { 
        id?: number; 
        description: string; 
        location: string; 
        startDate: Date; 
        endDate: Date; 
        price: number; 
        bookings?: Booking[]; 
        reviews?: Review[]; 
    }) {
        this.id = trip.id;
        this.description = trip.description;
        this.location = trip.location;
        this.startDate = trip.startDate;
        this.endDate = trip.endDate;
        this.price = trip.price;
        this.bookings = trip.bookings || []; 
        this.reviews = trip.reviews || []; 
    }

    validate() {
        if (!this.description || this.description.trim().length === 0) {
            throw new Error('Description is required.');
        }

        if (!this.location || this.location.trim().length === 0) {
            throw new Error('Location is required.');
        }

        if (!this.startDate) {
            throw new Error('Start date is required.');
        }

        if (!this.endDate) {
            throw new Error('End date is required.');
        }

        if (this.price < 0) {
            throw new Error('Price must be a positive number.');
        }
    }

    static from({
        id,
        description,
        location,
        startDate,
        endDate,
        price,
        bookings,
        reviews
    }: TripPrisma & { bookings: BookingPrisma[], reviews: ReviewPrisma[] }) : Trip{
        return new Trip({
            id: id ? Number(id) : undefined,
            description,
            location,
            startDate,
            endDate,
            price,
            bookings: bookings.map((booking) => Booking.from(booking)), 
            reviews: reviews.map((review) => Review.from(review))
        });
    }
}
