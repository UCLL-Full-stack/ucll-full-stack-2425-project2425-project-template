import { Booking } from './booking';
import { Review } from './review';
import {
    Trip as TripPrisma} from '@prisma/client';

export class Trip {
    private id?: number; 
    private description: string;
    private destination: string;
    private startDate: Date;
    private endDate: Date;
    private price: number;

    constructor(trip: { 
        id?: number; 
        description: string; 
        destination: string;
        startDate: Date; 
        endDate: Date; 
        price: number; 
    }) {
        this.id = trip.id;
        this.description = trip.description;
        this.destination = trip.destination;
        this.startDate = trip.startDate;
        this.endDate = trip.endDate;
        this.price = trip.price;
    }

    validate() {
        if (!this.description || this.description.trim().length === 0) {
            throw new Error('Description is required.');
        }

        if (!this.destination || this.destination.trim().length === 0) {
            throw new Error('Destination is required.');
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
        destination,
        startDate,
        endDate,
        price
    }: TripPrisma ) : Trip{
        return new Trip({
            id: id ? Number(id) : undefined,
            description,
            destination,
            startDate,
            endDate,
            price
        });
    }
}
